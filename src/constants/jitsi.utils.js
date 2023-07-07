import $ from 'jquery';
import JMeetJS from '@joinera/lib-jitsi-meet';
import options from './jitsi.config';

/**
 * @type {JMeetJS}
 */
const JitsiMeetJS = window.JitsiMeetJS || JMeetJS;
window.$ = $;

export function createTracksAndAddToRoom (room) {
    JitsiMeetJS.createLocalTracks({
        devices: ['video', 'audio']
    }).then((tracks) => {
        tracks.forEach(track => {
            room.addTrack(track);
        });
    }).catch(error => {
        console.error('There was an error creating the local tracks:', error);
    }
    );
}

export function createAndJoinRoom (connection, roomName, username, password, constraints) {
    return new Promise((resolve) => {
        const room = connection.initJitsiConference(roomName, {});
        room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
            resolve(room);
        });

        if (username) {
            room.setDisplayName(username);
        }

        room.setSenderVideoConstraint(constraints)

        if (password) {
            room.join(password);
        } else {
            room.join();
        }
    });
}

export function connect (roomName, tok) {
    return new Promise(((resolve, reject) => {
        let optionsWithRoom = { ...options };
        optionsWithRoom.serviceUrl = options.serviceUrl + `?room=${roomName}`;

        for (const [loggerId, level] of Object.entries(options.logging)) {
            if (loggerId !== "defaultLogLevel") {
                JitsiMeetJS.setLogLevelById(level, loggerId);
            }
        }

        const token = (tok?.length) ? tok : null
        const connection = new JitsiMeetJS.JitsiConnection(null, token, optionsWithRoom);

        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => {
            resolve(connection);
        });
        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, (e) => {
            reject("The connection failed. - " + e);
        });
        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, (e) => {
            reject("The connection disconnected. - " + e);
        });

        connection.connect();
    }))
}

export const makeResizableDiv = (div) => {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')


    function resize (e) {
        // if (currentResizer.classList.contains('bottom-right')) {
        element.style.width = e.pageX - element.getBoundingClientRect().left + 'px'
        // }
    }

    function stopResize () {
        window.removeEventListener('mousemove', resize)
    }

    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })

    }
}

export const ratios = ["4:3", "16:9", "1:1", "1:2"];

const getRatio = (aspect) => {
    const ratio = ratios[aspect].split(":");
    return ratio[1] / ratio[0];
};

export const resize = (aspect) => {
    const margin = 10;
    const ratio = getRatio(aspect)
    let dish = document.querySelector(".Dish");

    if (dish) {
        let width = dish.offsetWidth - margin * 2;
        let height = dish.offsetHeight - margin * 2;

        // loop (i recommend you optimize this)
        let max = 0;
        let i = 1;
        while (i < 5000) {
            let area = getArea(i, dish, width, height, ratio, margin);
            if (area === false) {
                max = i - 1;
                break;
            }
            i++;
        }

        // remove margins
        max = max - margin * 2;
        resizer(max, dish, margin, ratio, aspect);
    }
};

export const resizer = (width, dish, margin, ratio, aspect) => {
    for (var s = 0; s < dish.children.length; s++) {
        // camera fron dish (div without class)
        let element = dish.children[s];

        //   custom margin
        element.style.margin = margin + "px";

        // calculate dimensions
        element.style.width = width + "px";
        element.style.height = width * ratio + "px";

        // to show the aspect ratio in demo (optional)
        element.setAttribute("data-aspect", ratios[aspect]);
    }
}

export const getArea = (increment, dish, width, height, ratio, margin) => {

    let i = 0;
    let w = 0;
    let h = increment * ratio + (margin * 2);
    while (i < (dish.children.length)) {
        if ((w + increment) > width) {
            w = 0;
            h = h + (increment * ratio) + (margin * 2);
        }
        w = w + increment + (margin * 2);
        i++;
    }
    if (h > height || increment > width) return false;
    else return increment;
}