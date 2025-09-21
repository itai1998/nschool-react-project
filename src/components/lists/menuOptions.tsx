interface ProductOption {
  product: string
  [key: string]: any // Allows any number of categories (category1, category2, etc.)
}

export const productOneOptions: ProductOption[] = [
  {
    product: '商店',
    category1: {
      title: '選購',
      links: [
        {
          link1: '選購最新產品',
          link2: 'Mac',
          link3: 'iPad',
          link4: 'iPhone',
          link5: 'Apple Watch',
          link6: 'Apple Vision Pro',
          link7: 'AirPods',
        },
      ],
    },
    category2: {
      title: '快速連結',
      links: [
        {
          link1: '尋找直營店',
          link2: '訂單狀態',
          link3: 'Apple Trade In 換購方案',
          link4: '信用卡分期付款',
          link5: '個人化設定服務',
          link6: '大專學生優惠活動',
        },
      ],
    },
    category3: {
      title: '特定商店選購',
      links: [
        {
          link1: '認證整修品',
          link2: '教育',
          link3: '商務',
        },
      ],
    },
  },
  {
    product: 'Mac',
    category1: {
      title: '探索 Mac',
      links: [
        {
          link1: '探索所有 Mac',
          link2: 'MacBook Air',
          link3: 'MacBook Pro',
          link4: 'iMac',
          link5: 'Mac Mini',
          link6: 'Mac Studio',
          link7: 'Mac Pro',
        },
      ],
    },
    category2: {
      title: '選購 Mac',
      links: [
        {
          link1: '選購 Mac',
          link2: 'Mac 配件',
          link3: 'Apple Trade In 換購方案',
          link4: '信用卡分期付款',
          link5: '個人化設定服務',
          link6: '大專學生優惠活動',
        },
      ],
    },
    category3: {
      title: 'Mac 相關',
      links: [
        {
          link1: 'Mac 支援服務',
          link2: 'Apple Care',
          link3: 'MacOS Tahoe',
          link4: 'Apple intelligence',
          link5: 'Apple 出品的 App',
          link6: '接續互通',
          link7: 'iCloud+',
          link8: 'Mac 商務應用',
          link9: '教育',
        },
      ],
    },
  },
  {
    product: 'iPad',
    category1: {
      title: '探索 iPad',
      links: [
        {
          link1: '探索所有 iPad',
          link2: 'iPad Pro',
          link3: 'iPad Air',
          link4: 'iPad',
          link5: 'iPad mini',
          link6: 'Apple Pencil',
          link7: '鍵盤',
        },
      ],
    },
    category2: {
      title: '選購 iPad',
      links: [
        {
          link1: '選購 iPad',
          link2: 'iPad 配件',
          link3: 'Apple Trade In 換購方案',
          link4: '信用卡分期付款',
          link6: '大專學生優惠活動',
        },
      ],
    },
    category3: {
      title: 'iPad 相關',
      links: [
        {
          link1: 'iPad 支援服務',
          link2: 'Apple Care',
          link3: 'iPadOS 26',
          link4: 'Apple intelligence',
          link5: 'Apple 出品的 App',
          link6: 'iCloud+',
          link7: 'iPad 商務應用',
          link8: '教育',
        },
      ],
    },
  },
  {
    product: 'Watch',
    category1: {
      title: '探索 Watch',
      links: [
        {
          link1: '探索所有 Apple Watch',
          link2: 'Apple Watch Series 11',
          link3: 'Apple Watch SE 3',
          link4: 'Apple Watch Ultra 3',
          link5: 'Apple Watch Nike',
          link6: 'Apple Watch Hermes',
          link7: 'Apple Watch 錶帶',
        },
      ],
    },
    category2: {
      title: '選購 Watch',
      links: [
        {
          link1: '選購 Watch',
          link2: 'Watch 配件',
          link3: 'Apple Trade In 換購方案',
          link4: '信用卡分期付款',
          link5: '個人化設定服務',
          link6: '大專學生優惠活動',
        },
      ],
    },
    category3: {
      title: 'Watch 相關',
      links: [
        {
          link1: 'Watch 支援服務',
          link2: 'Apple Care',
          link3: 'WatchOS 26',
          link4: 'Apple intelligence',
          link5: 'Apple 出品的 App',
          link6: 'iCloud+',
          link7: 'Watch 商務應用',
          link8: '教育',
        },
      ],
    },
  },
]
