import defaultSettings from '@/settings'

const title = defaultSettings.title || '校园通行码系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
