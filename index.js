import { html } from '/web-view-shell-tester/js/lit-html/lit-html.js';
import { RaisedButton, WidgetBuilder, SnackBarBloc, I18NBlocProvider, ThemeProvider, Theme, BogusBloc, NoBlocRaisedButton } from '/web-view-shell-tester/js/use-them/index.js';
import { Bloc } from '/web-view-shell-tester/js/bloc-them/index.js';
import { repeat } from '/web-view-shell-tester/js/lit-html/directives/repeat.js';

class ReadContactsBloc extends Bloc {
    constructor() {
        super([]);
        this._name = "ReadContactsBloc";
    }
    async readPhonebook() {
        try {
            let contacts = await native.readPhonebook();
            if (contacts && contacts.length > 0) {
                this.emit(contacts);
            }
        }
        catch (e) {
            let snackBarBloc = SnackBarBloc.search("SnackBarBloc", this.hostElement);
            snackBarBloc.postMessage({ msg: "No contacts api present" });
        }
    }
}
class ReadContactButton extends RaisedButton {
    onPress() {
        this.bloc.readPhonebook();
    }
    constructor() {
        super("ReadContactsBloc");
    }
}
customElements.define("test-contact-button", ReadContactButton);
class ContactsPanel extends WidgetBuilder {
    builder(state) {
        return html `<lay-them in="column" ma="flex-start" ca="stretch">
            <div>
                <test-contact-button>
                    <ut-h3 use="color:white;">Get Contacts</ut-h3>
                </test-contact-button>
            </div>
            <div style="flex:1">
                <lay-them in="column" ma="flex-start">
                    ${repeat(state, e => e.id, (e, index) => {
            return html `<div style="border:1px solid black;">
                                        <div>${index}. ${e.name}</div>
                                        <div>${e.phone_number}</div>
                                </div>`;
        })}
                </lay-them>
            </div>
        </lay-them>`;
    }
    constructor() {
        super("ReadContactsBloc", {
            blocs_map: {
                ReadContactsBloc: new ReadContactsBloc()
            }
        });
    }
}
customElements.define("contacts-panel", ContactsPanel);

class VideoAudioCompressBloc extends Bloc {
    constructor() {
        super([]);
        this._name = "VideoAudioCompressBloc";
        this.objectUrlReg = [];
    }
    async readAudioOrVideoFileAndCompressThem() {
        try {
            if (native && native.showFilePickerAndCompressThem) {
                let input = {
                    id: "lalala",
                    inputMimeType: "video/*",
                    maxFileAllowed: 3,
                    themeHexColor: "#333333",
                    outputQualities: [
                        {
                            bitrate: 1000000,
                            maxVideoDimension: 200,
                            mimeType: "video/webm"
                        },
                        {
                            bitrate: 1000000,
                            maxVideoDimension: 400,
                            mimeType: "video/webm"
                        }
                    ]
                };
                let op = await native.showFilePickerAndCompressThem(input);
                if (op.blobs && op.blobs.length > 0) {
                    this.objectUrlReg.forEach(e => {
                        URL.revokeObjectURL(e);
                    });
                    this.objectUrlReg = [];
                    op.blobs.forEach(e => {
                        this.objectUrlReg.push(URL.createObjectURL(e.file));
                    });
                    this.opData = op;
                    this.emit(this.objectUrlReg);
                }
            }
        }
        catch (e) {
            let snackBarBloc = SnackBarBloc.search("SnackBarBloc", this.hostElement);
            snackBarBloc.postMessage({ msg: "No video/audio compress function present" });
        }
    }
}
class ShowFilePicker extends RaisedButton {
    onPress() {
        this.bloc.readAudioOrVideoFileAndCompressThem();
    }
    constructor() {
        super("VideoAudioCompressBloc");
    }
}
customElements.define("show-file-picker", ShowFilePicker);
class VideoAudioFilePanel extends WidgetBuilder {
    constructor() {
        super("VideoAudioCompressBloc", {
            blocs_map: {
                VideoAudioCompressBloc: new VideoAudioCompressBloc()
            }
        });
    }
    builder(state) {
        return html `
        <lay-them in="column" ma="flex-start" ca="stretch">
            <div>
                <show-file-picker><ut-p use="color:white">Pick Video/Audio file</ut-p></show-file-picker>
            </div>
            <div>
                ${state.length === 0 ? html `<ut-p>No file selected</ut-p>` : html `${repeat(state, e => e, (e, i) => {
            return html `<div>
                      ${this.bloc.opData.blobs[i].type === "audio" ? html `<audio src=${e}></audio>` : html `<video src=${e}></video>`}
                  </div>`;
        })}`}
            </div>
        </lay-them>`;
    }
}
customElements.define("video-audio-panel", VideoAudioFilePanel);

class ThermalPrintBloc extends Bloc {
    constructor() {
        super(0);
    }
    async print() {
        let snackBarBloc = SnackBarBloc.search("SnackBarBloc", this.hostElement);
        let textToPrint = "[C]<u><font size='tall'>YouCare</font></u>\n[C]<barcode type='ean13' height='10'>+919096925359</barcode>\n[C]Best quality personal care products\n[L]\n[L]27-MAY-2022 14:02[R]<b>Items: 8</b>\n[C]================================\n[L]<b>Product</b>[R]<b>Qty</b>[R]<b>Price</b>\n[L]\n[L]axe deodorant gold temptation[R]1[R]306.9\n[L]HSN: , TAX: \n[L]nivea roll on deo pearl and beauty[R]2[R]193.2\n[L]HSN: , TAX: \n[L]engage deo blush[R]1[R]201.3\n[L]HSN: , TAX: \n[L]brut deodorant musk[R]1[R]311.6\n[L]HSN: , TAX: \n[L]spinz deo enchante[R]1[R]239.7\n[L]HSN: , TAX: \n[L]fogg extreme deo spray[R]1[R]258.9\n[L]HSN: , TAX: \n[L]axe dark temptation deodorant[R]1[R]306.9\n[L]HSN: , TAX: \n[L]\n[C]--------------------------------\n[L]<font size='tall'>TOTAL [R]1731.8</font>\n[L]\n[L]SAVING [R]74.6\n[L]TAX [R]86.6\n[L]\n[C]================================\n[L]Order/Bill No:\n[C]41363eb93f9726347deaf5e5e2d9b2f3\n[C]<qrcode size='20'>41363eb93f9726347deaf5e5e2d9b2f3</qrcode>";
        try {
            if (native && native.thermalPrint) {
                if (await native.thermalPrint(textToPrint)) {
                    snackBarBloc.postMessage({ msg: "Print message sent" });
                }
                else {
                    snackBarBloc.postMessage({ msg: "print message not sent" });
                }
            }
        }
        catch (e) {
            snackBarBloc.postMessage({ msg: "No esc/pos thermal print lib present" });
        }
    }
}
class ThermalPrintTestButton extends RaisedButton {
    onPress() {
        this.bloc.print();
    }
    constructor() {
        super("ThermalPrintBloc", {
            blocs_map: {
                ThermalPrintBloc: new ThermalPrintBloc()
            }
        });
    }
}
customElements.define("thermal-print-button", ThermalPrintTestButton);

/**
 * Class to provide I18N to your app.
 */
class AppI18NProvider extends I18NBlocProvider {
    constructor() {
        super({
            app_name: "TestWebView1",
            welcome_msg: "Hi there!"
        });
    }
}
customElements.define("i18n-provider", AppI18NProvider);
/**
 * Change app theme from here
 */
class AppThemeProvider extends ThemeProvider {
    constructor() {
        super((() => {
            let theme = new Theme();
            theme.primaryColor = "#ff2052";
            theme.secondaryColor = "#4e00ec";
            theme.backgroundColor = "#ededed";
            return theme;
        })());
    }
}
customElements.define("app-theme-provider", AppThemeProvider);
class TestWebView1 extends WidgetBuilder {
    constructor() {
        super("BogusBloc", {
            blocs_map: {
                BogusBloc: new BogusBloc(),
                SnackBarBloc: new SnackBarBloc(),
            }
        });
    }
    builder(state) {
        return html `
        <style>
            .title{
                display: flex;
                align-items: center;
                height: 100%;
            }
            li{
                padding: 5px;
            }
            pre{
                background-color: #dbdbdb;
                padding: 10px;
                overflow: auto;
            }
        </style>
      <i18n-provider>
        <app-theme-provider>
            <div style="position: fixed;bottom: 80px;z-index: 10001;width:100%;" id="snackbar">
                <lay-them ma="center" ca="center"><snack-bar></snack-bar></lay-them>
            </div>
            <ut-scaffold>
                <div slot="title" class="title">
                    <ut-h1 use="color: white">app_name</ut-h1>
                </div>
                <div slot="body" style="height: 100%">
                <ut-tab-controller>
                    <ut-tabs>
                        <ut-tab index="0" icon="info">
                            <lay-them ma="flex-start" in="column" ca="stretch">
                                <div><a href="https://github.com/anuragvohraec/web-view-shell-tester"><ut-h1>Click to see requirements</ut-h1></a></div>
                            </lay-them>
                        </ut-tab>

                        <ut-tab index="1" icon="smartphone">
                            <div class="full">
                                <div><ut-h1>Phone book contact read</ut-h1></div>
                                <div>
                                    <contacts-panel></contacts-panel>
                                </div>
                            </div>
                        </ut-tab>

                        <ut-tab index="2" icon="videocam">
                            <div><ut-h1>Video and Audio file compression</ut-h1></div>
                            <div>
                                <video-audio-panel></video-audio-panel>
                            </div>
                        </ut-tab>

                        <ut-tab index="3" icon="print">
                            <div><ut-h1>Printing test</ut-h1></div>
                            <div><thermal-print-button>
                                <ut-p use="color:white;">Thermal test print</ut-p>
                            </thermal-print-button></div>
                        </ut-tab>

                        <ut-tab index="4" icon="notification">
                            <ut-h1>Push notification testing</ut-h1>
                            <div>
                                <notification-button>
                                    <ut-p use="color:white">Test Notification</ut-p>
                                </notification-button>
                            </div>
                        </ut-tab>

                    </ut-tabs>
                </ut-tab-controller>
                </div>
                <div slot="menu">
                    <ut-h3>app_name</ut-h3>
                </div>
            </ut-scaffold>
        </app-theme-provider>
    </i18n-provider>
    `;
    }
}
customElements.define("test-web-view-1", TestWebView1);
class NotificationTestButton extends NoBlocRaisedButton {
    onPress() {
        let snackBarBloc = SnackBarBloc.search("SnackBarBloc", this);
        try {
            if (native && native.pushNotifications) {
                native.pushNotifications([{
                        title: "hello",
                        body: "Wow message is success",
                        icon: "/icon/image.png",
                        badge: "/icon/image.png"
                    }]);
            }
        }
        catch (e) {
            snackBarBloc.postMessage({ msg: "No notification API present" });
        }
    }
}
customElements.define("notification-button", NotificationTestButton);

export { TestWebView1 };
