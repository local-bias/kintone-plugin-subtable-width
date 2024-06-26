import { PLUGIN_NAME } from '@/common/constants';

/**
 * イベント実行に必要なプロパティ情報
 * 必須はactionのみで、eventsに指定がない場合は一覧表示イベント(app.record.index.show)が設定されます
 */
export type Config = Readonly<{
  enables?: Enables;
  events?: string[] | ((pluginId: string) => string[]);
  action: PluginAction;
  disableMobile?: boolean;
}>;

class Launcher {
  private _pluginId: string;

  /**
   * 複数の処理を、各イベントに登録することができます
   * @param pluginId プラグインID
   */
  constructor(pluginId: string) {
    this._pluginId = pluginId;
  }

  /**
   * 指定された各処理を、各イベント発生時に実行されるよう登録していきます.
   * 特に指定がない場合、モバイル向けにもイベントが登録されます.
   *
   * @param configs イベント実行に必要なプロパティ
   */
  public launch = (configs: Config[]) => {
    for (const config of configs) {
      const { enables = () => true, events = ['app.record.index.show'], action, disableMobile = false } = config;

      const desktopEvents = typeof events === 'function' ? events(this._pluginId) : events;

      const mobileEvents = !disableMobile ? desktopEvents.map((type) => 'mobile.' + type) : [];

      const handler = (event: KintoneEvent) => {
        try {
          return enables(event) ? action(event, this._pluginId) : event;
        } catch (error) {
          event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
          console.error('エラー', error);
        }
        return event;
      };

      kintone.events.on([...desktopEvents, ...mobileEvents], handler);
    }
  };
}

export default Launcher;
