// @ts-check
const hp = 'https://konomi.app';
const cdn = 'https://kintone-plugin.konomi.app';
const key = 'subtable-width';

/** @satisfies { Plugin.Meta.Config } */
export default /** @type { const } */ ({
  id: `ribbit-kintone-plugin-${key}`,
  pluginReleasePageUrl: `https://ribbit.konomi.app/kintone-plugin/`,
  server: {
    port: 56722,
  },
  lint: {
    build: false,
  },
  manifest: {
    base: {
      manifest_version: 1,
      version: '2.0.0',
      type: 'APP',
      name: {
        en: 'kintone-plugin-template',
        ja: '一覧サブテーブル幅調整プラグイン',
        zh: '插件模板',
      },
      description: {
        en: 'kintone-plugin-template',
        ja: '通常では変更できないサブテーブルの表示項目や幅を調整できます',
        zh: '插件模板',
      },
      icon: 'icon.png',
      homepage_url: { ja: hp, en: hp },
      desktop: { js: [`${cdn}/common/desktop.js`], css: [`${cdn}/common/desktop.css`] },
      mobile: { js: [`${cdn}/common/desktop.js`], css: [`${cdn}/common/desktop.css`] },
      config: {
        html: 'config.html',
        js: [`${cdn}/common/config.js`],
        css: [`${cdn}/common/config.css`],
        required_params: [],
      },
    },
    prod: {
      desktop: { js: [`${cdn}/${key}/desktop.js`], css: [] },
      mobile: { js: [`${cdn}/${key}/desktop.js`], css: [] },
      config: { js: [`${cdn}/${key}/config.js`], css: [] },
    },
    standalone: {
      desktop: { js: ['desktop.js'], css: [] },
      mobile: { js: ['desktop.js'], css: [] },
      config: { js: ['config.js'], css: [] },
    },
  },
});
