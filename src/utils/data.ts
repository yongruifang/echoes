// 卡片背景色
export const cardBgColorNames = [
    'pink',
    'yellow',
    'blue',
    'green',
    'purple',
    'gray'
]
export const cardBgColor = {
    pink: {
        rgb: 'rgb(252,175,162)',
        rgba: 'rgba(252,175,162,0.3)'
    },
    yellow: {
        rgb: 'rgb(255,227,148)',
        rgba: 'rgba(255,227,148,0.3)'
    },
    blue: {
        rgb: 'rgb(146,230,245)',
        rgba: 'rgba(146,230,245,0.3)',
    },
    green: {
        rgb: 'rgb(168,237,138)',
        rgba: 'rgba(168,237,138,0.3)',
    },
    purple: {
        rgb: 'rgb(202,167,247)',
        rgba: 'rgba(202,167,247,0.3)',
    },
    gray: {
        rgb: 'rgb(212,212,212)',
        rgba: 'rgba(212,212,212,0.3)',
    }
}
interface Tag {
    name: string,
    param: string,
}
export const CardLabel: Tag[] = [
    { name: "全部", param: 'all' },
    { name: "留言", param: 'text' },
    { name: "目标", param: 'target' },
    { name: "理想", param: 'dream' },
    { name: "过去", param: 'path' },
    { name: "将来", param: 'future' },
    { name: "爱情", param: 'love' },
    { name: "亲情", param: 'affection' },
    { name: "友情", param: 'friend' },
    { name: "秘密", param: 'secret' },
    { name: "信条", param: 'principle' },
]

// 墙
export const WallLabel = {}