import defaultSettings from '@/settings'
const title = defaultSettings.title || 'Vue element admin'
export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}