# Props

## roomName

**String** | required

The name of the room to join (Should be at least 4 characters long and contains no capital letters or Spaces).

## appDomain

**String** | optional | _meet.jit.si_

The domain of the jitsi meet

## roomPassword

**String** | optional | _null_

The password of the room.

## userName

**String** | optional | _null_

The username of the user (Should be at least 3 characters long if used and should contain no capital letters or Spaces), If not provided a random string will be generated.

## displayName

**String** | optional | _null_

The display name of the user.

## videoConstraints

**Number** | optional | _360_

The video constraints of the user (180, 360, 720).

## appToken

**String** | optional | _null_

the JWT token used to authenticate with the server.

## allowVideo

**Bool** | optional | _true_

Set to false if you want audio only.

## allowAudio

**Bool** | optional | _true_

Set to false if you want video only.

## debugLevel

**String** | optional | _ERROR_

The debug level of the jitsi meet api.

Available options:

- DEBUG
- ERROR
- INFO
- LOG
- TRACE
- WARN

## aspect

**Number** | optional | _0_

Determines the aspect ratio of the video

Available options:

- **0:** 4:3
- **1:** 16:9
- **2:** 1:1
- **3:** 1:2

## alwaysShowControls

**Bool** | optional | _false_

Set to true if you want to always show the controls, otherwise they will only show when you hover over the video.

## autoConnect

**Bool** | optional | _false_

When set to true, the component will automatically connect to the room when it is mounted, this is useful if you want to connect to the room when the user clicks an action button probably after filling a form.
