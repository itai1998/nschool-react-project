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
    product: 'Product 3',
    category1: {
      title: 'p3 - Category 1',
      links: [
        {
          link1: 'p3 Item 1',
          link2: 'p3 Item 2',
          link3: 'p3 Item 3', // More than 2 links
        },
      ],
    },
    category2: {
      title: 'p3 - Category 2',
      links: [
        {
          link1: 'p3 Item 4',
          link2: 'p3 Item 5',
        },
        {
          link1: 'p3 Item 6', // Multiple link groups
          link2: 'p3 Item 7',
        },
      ],
    },
    category3: {
      title: 'p3 - Category 3',
      links: [
        {
          link1: 'p3 Item 8',
          link2: 'p3 Item 9',
        },
      ],
    },
    category4: {
      title: 'p3 - Category 4', // More than 3 categories
      links: [
        {
          link1: 'p3 Item 10',
          link2: 'p3 Item 11',
        },
      ],
    },
  },
  {
    product: 'Product 4',
    category1: {
      title: 'p4 - Single Category',
      links: [
        {
          link1: 'p4 Item 1',
          link2: 'p4 Item 2',
          link3: 'p4 Item 3',
          link4: 'p4 Item 4', // Many links
        },
      ],
    },
  },
]
