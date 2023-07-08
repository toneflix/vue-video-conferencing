export const themeData = JSON.parse("{\"repoLabel\":\"Contribute!\",\"repo\":\"https://github.com/toneflix/vue-video-conferencing\",\"docsDir\":\"docs\",\"editLinks\":true,\"docsBranch\":\"main\",\"editLinkText\":\"Help us improve this page!\",\"lastUpdated\":\"Last Updated\",\"search\":true,\"serviceWorker\":{\"updatePopup\":{\"message\":\"New content is available.\",\"buttonText\":\"Refresh\"}},\"navbar\":[{\"text\":\"Home\",\"link\":\"/\"},{\"text\":\"Guide\",\"link\":\"/guide\"}],\"sidebar\":{\"/guide/\":[{\"title\":\"Guide\",\"collapsable\":false,\"children\":[\"/guide\",\"getting-started\",\"props\",\"slots\",\"events\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
