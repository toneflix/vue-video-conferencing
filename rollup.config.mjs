import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import vue from 'rollup-plugin-vue'

export default [
    {
        input: 'src/index.js',
        output: [
            {
                format: 'esm',
                file: 'dist/vue-video-conferencing.mjs'
            },
            {
                format: 'cjs',
                file: 'dist/vue-video-conferencing.cjs'
            }
        ],
        plugins: [
            vue(), peerDepsExternal()
        ]
    }
]