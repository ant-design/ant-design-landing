export default {
  template: {
    template: [
      'Nav0_0',
      'Banner0_1',
      'Content0_0',
      'Content5_0',
      'Content3_0',
      'Footer1_0',
    ],
    config: {},
    style: [],
    other: {},
  },
  seeconf: {
    template: [
      'Nav2_0',
      'Banner3_0',
      'Content8_0',
      'Content9_0',
      'Content10_0',
      'Content11_0',
      'Content12_0',
      'Footer2_0',
    ],
    config: {
      Nav2_0: {
        dataSource: {
          Menu: {
            children: [
              {
                name: 'Banner3_0',
                to: 'Banner3_0',
                children: '首页',
                className: 'active menu-item',
              },
              {
                name: 'Content8_0',
                to: 'Content8_0',
                children: '特邀嘉宾',
                className: 'menu-item',
              },
              {
                name: 'Content9_0',
                to: 'Content9_0',
                children: '会议日程',
                className: 'menu-item',
              },
              {
                name: 'Content10_0',
                to: 'Content10_0',
                children: '大会地址',
                className: 'menu-item',
              },
              {
                name: 'Content11_0',
                to: 'Content11_0',
                children: '展台展示',
                className: 'menu-item',
              },
              {
                name: 'Content12_0',
                to: 'Content12_0',
                children: '特别鸣谢',
                className: 'menu-item',
              },
            ],
          },
          wrapper: {
            className: 'header2 home-page-wrapper jrhtw9ph4a-editor_css',
          },
          logo: {
            children:
              'https://gw.alipayobjects.com/os/s/prod/seeconf/9b458a789d9a000312899b42a7542b9c.svg',
          },
        },
      },
    },
    style: [
      {
        cssString:
          'div > .templates-wrapper > .jrhtw9ph4a-editor_css {\n  position: absolute;\n  background-color: rgba(0, 21, 41, 0);\n  box-shadow: none;\n}',
        id: 'div_templates-wrapper_jrhtw9ph4a-editor_css',
      },
      {
        cssString:
          '.home-page > .header2-menu > .active {\n  color: #ffffff;\n}',
        id: 'home-page_header2-menu_active',
      },
      {
        cssString:
          '.home-page > .header2-menu > .menu-item:hover {\n  color: #e0e7ff;\n  border-bottom-color: #ffffff;\n}',
        id: 'home-page_header2-menu_menu-item',
      },
    ],
    other: {},
  },
  tuying: {
    template: [
      'Nav3_0',
      'Banner5_0',
      'Feature6_0',
      'Feature7_0',
      'Feature0_0',
      'Feature8_0',
      'Footer1_0',
    ],
    config: {
      Nav3_0: {
        dataSource: {
          wrapper: {
            className: 'header3 home-page-wrapper jzih1dpqqrg-editor_css',
          },
          Menu: {
            children: [
              {
                name: 'item1',
                className: 'header3-item',
                children: {
                  href: '#',
                  children: [{ children: '<p>订订群</p>', name: 'text' }],
                },
                subItem: [
                  {
                    className: 'item-sub',
                    children: {
                      className: 'item-sub-item jzj8295azrs-editor_css',
                      children: [
                        {
                          name: 'image0',
                          className: 'item-image jzj81c9wabh-editor_css',
                          children:
                            'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*4_S6ToPfj-QAAAAAAAAAAABkARQnAQ',
                        },
                      ],
                    },
                    name: 'sub~jzj8hceysgj',
                  },
                ],
              },
              {
                name: 'item2',
                className: 'header3-item',
                children: {
                  href: '#',
                  children: [{ children: '<p>帮助中心</p>', name: 'text' }],
                },
              },
            ],
          },
          logo: {
            children:
              'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-J8NSLj9rbsAAAAAAAAAAABkARQnAQ',
            className: 'header3-logo jzjgnya1gmn-editor_css',
          },
        },
      },
      Feature0_0: {
        dataSource: {
          childWrapper: {
            children: [
              {
                name: 'block0',
                className: 'jzjn8afnsxb-editor_css content0-block',
                md: 6,
                xs: 24,
                children: {
                  className: 'content0-block-item jzjgrrupf2c-editor_css',
                  children: [
                    {
                      name: 'image',
                      className: 'content0-block-icon jzjgrlz134-editor_css',
                      children:
                        'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ',
                    },
                    {
                      name: 'title',
                      className: 'content0-block-title jzj8xt5kgv7-editor_css',
                      children: '一站式业务接入',
                    },
                    {
                      name: 'content',
                      children: '支付、结算、核算接入产品效率翻四倍',
                      className: 'jzj8z9sya9-editor_css',
                    },
                  ],
                },
              },
              {
                name: 'block1',
                className: 'content0-block',
                md: 6,
                xs: 24,
                children: {
                  className: 'content0-block-item',
                  children: [
                    {
                      name: 'image',
                      className: 'content0-block-icon jzjncn210ql-editor_css',
                      children:
                        'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ',
                    },
                    {
                      name: 'title',
                      className: 'content0-block-title jzjne54fwqm-editor_css',
                      children: '一站式事中风险监控',
                    },
                    {
                      name: 'content',
                      children: '在所有需求配置环节事前风险控制和质量控制能力',
                    },
                  ],
                },
              },
              {
                name: 'block2',
                className: 'content0-block',
                md: 6,
                xs: 24,
                children: {
                  className: 'content0-block-item',
                  children: [
                    {
                      name: 'image',
                      className: 'content0-block-icon jzjndq0dueg-editor_css',
                      children:
                        'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ',
                    },
                    {
                      name: 'title',
                      className: 'content0-block-title jzjne24af8c-editor_css',
                      children: '一站式数据运营',
                    },
                    {
                      name: 'content',
                      children: '沉淀产品接入效率和运营小二工作效率数据',
                    },
                  ],
                },
              },
              {
                name: 'block~jzjn87bmyc7',
                className: 'content0-block',
                md: 6,
                xs: 24,
                children: {
                  className: 'content0-block-item',
                  children: [
                    {
                      name: 'image',
                      className: 'content0-block-icon jzjndsyw8sf-editor_css',
                      children:
                        'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ',
                    },
                    {
                      name: 'title',
                      className: 'content0-block-title jzjndw5oerk-editor_css',
                      children: '一站式数据运营',
                    },
                    {
                      name: 'content',
                      children: '沉淀产品接入效率和运营小二工作效率数据',
                    },
                  ],
                },
              },
            ],
          },
        },
      },
      Footer1_0: {
        dataSource: {
          block: {
            children: [
              {
                name: 'block0',
                xs: 24,
                md: 8,
                className: 'block',
                title: {
                  className: 'logo jzl0qcpyjra-editor_css',
                  children:
                    'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*GzZ-QqkpH4AAAAAAAAAAAABkARQnAQ',
                },
                childWrapper: {
                  className: 'slogan',
                  children: [
                    {
                      name: 'content0',
                      children: '<p>蚂蚁金服计算机视觉平台</p>',
                    },
                  ],
                },
              },
              {
                name: 'block2',
                xs: 24,
                md: 8,
                className: 'block',
                title: { children: '<p>联系我们</p>' },
                childWrapper: {
                  children: [
                    {
                      name: 'image~jzl0tcm4f1d',
                      className: '',
                      children:
                        'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*NoENTI5uyn4AAAAAAAAAAABkARQnAQ',
                    },
                    {
                      href: '#',
                      name: 'link0',
                      children: '<p>图鹰对接答疑钉钉群</p>',
                      className: 'jzl0u1bko6-editor_css',
                    },
                    { href: '#', name: 'link1', children: '联系我们' },
                  ],
                },
              },
              {
                name: 'block3',
                xs: 24,
                md: 8,
                className: 'block',
                title: { children: '资源' },
                childWrapper: {
                  children: [
                    { href: '#', name: 'link0', children: 'Ant Design' },
                    { href: '#', name: 'link1', children: 'Ant Motion' },
                  ],
                },
              },
            ],
          },
          copyright: {
            children:
              '<span><a href="http://abc.alipay.com">隐私权政策</a>&nbsp; &nbsp; &nbsp; |&nbsp; &nbsp; &nbsp; <a href="http://abc.alipay.com">权益保障承诺书</a>&nbsp; &nbsp; &nbsp;&nbsp;ICP证:浙B2-20100257&nbsp; &nbsp; &nbsp;&nbsp;Copyright © 2019 蚂蚁金融服务集团<br></span>',
          },
        },
      },
    },
    style: [
      {
        cssString:
          '#Nav3_0.jzih1dpqqrg-editor_css {\n  position: absolute;\n  background-color: rgba(255, 255, 255, 0);\n  box-shadow: none;\n}\n',
        id: 'Nav30jzih1dpqqrgeditorcss',
        cid: 'Nav3_0',
      },
      {
        cssString:
          '.ant-menu-item > .item-sub-item > .jzj81c9wabh-editor_css {\n  float: none;\n  margin: 4px 0px 0px;\n}\n',
        id: 'antmenuitemitemsubitemjzj81c9wabheditorcss',
        cid: 'Nav3_0',
      },
      {
        cssString:
          '.ant-menu > .ant-menu-item > .jzj8295azrs-editor_css {\n  padding: 0;\n}\n',
        id: 'antmenuantmenuitemjzj8295azrseditorcss',
        cid: 'Nav3_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .content0-block-item > .jzj8xt5kgv7-editor_css {\n  font-size: 18px;\n}\n',
        id: 'Featureantcolcontentblockitemjzjxtkgveditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Nav3_0 .home-page > .jzjgnya1gmn-editor_css {\n  width: 110px;\n}\n',
        id: 'Navhomepagejzjgnyagmneditorcss',
        cid: 'Nav3_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-row > .ant-col > .content0-block-item {\n  \n}\n',
        id: 'Featureantrowantcolcontentblockitem',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .jzjgrrupf2c-editor_css > .content0-block-icon {\n  width: 10px;\n}\n',
        id: 'Featureantcoljzjgrrupfceditorcsscontentblockicon',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .jzjgrrupf2c-editor_css > .jzjgrlz134-editor_css {\n  width: 190px;\n  height: 190px;\n}\n',
        id: 'Featureantcoljzjgrrupfceditorcssjzjgrlzeditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .content0-block-item > .jzjgrlz134-editor_css {\n  width: 190px;\n}\n',
        id: 'Featureantcolcontentblockitemjzjgrlzeditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .content0-block-item > .jzjncn210ql-editor_css {\n  width: 190px;\n  height: 190px;\n}\n',
        id: 'Featureantcolcontentblockitemjzjncnqleditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .content0-block-item > .jzjndq0dueg-editor_css {\n  width: 190px;\n  height: 190px;\n}\n',
        id: 'Featureantcolcontentblockitemjzjndqduegeditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .content0-block-item > .jzjndsyw8sf-editor_css {\n  width: 190px;\n  height: 190px;\n}\n',
        id: 'Featureantcolcontentblockitemjzjndsywsfeditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .content0-block-item > .jzjndw5oerk-editor_css {\n  font-size: 18px;\n}\n',
        id: 'Featureantcolcontentblockitemjzjndwoerkeditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .content0-block-item > .jzjne24af8c-editor_css {\n  font-size: 18px;\n}\n',
        id: 'Featureantcolcontentblockitemjzjneafceditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-col > .content0-block-item > .jzjne54fwqm-editor_css {\n  font-size: 18px;\n}\n',
        id: 'Featureantcolcontentblockitemjzjnefwqmeditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 .ant-row > .ant-col > .jzjgrrupf2c-editor_css {\n  padding: 0;\n}\n',
        id: 'Featureantrowantcoljzjgrrupfceditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString: '\n',
        id: 'Featuredivantrowjzjnafnsxbeditorcss',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Feature0_0 div > .ant-row > .content0-block {\n  min-height: 340px;\n  padding: 24px;\n  transition: box-shadow 0.45s ease 0s\n}\n#Feature0_0 div > .ant-row > .content0-block:hover {\n box-shadow: 0px 11px 56px rgba(100,100,136,0.15) ;\n}\n',
        id: 'Featuredivantrowcontentblock',
        cid: 'Feature0_0',
      },
      {
        cssString:
          '#Footer1_0 .ant-row > .ant-col > .jzl0qcpyjra-editor_css {\n  width: 100px;\n}\n',
        id: 'Footerantrowantcoljzlqcpyjraeditorcss',
        cid: 'Footer1_0',
      },
      {
        cssString:
          '#Footer1_0 .ant-col > div > .jzl0u1bko6-editor_css {\n  margin: 16px 0 0 ;\n}\n',
        id: 'Footerantcoldivjzlubkoeditorcss',
        cid: 'Footer1_0',
      },
    ],
    other: {},
    page: {},
  },
};
