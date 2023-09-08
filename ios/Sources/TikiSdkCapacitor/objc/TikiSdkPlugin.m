#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(TikiSdkPlugin, "TikiSdk",
           CAP_PLUGIN_METHOD(id, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(address, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(initialize, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(isInitialized, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(guard, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createTitle, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getTitle, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createLicense, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getLicense, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getLicenses, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createPayable, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getPayable, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getPayables, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createReceipt, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getReceipt, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getReceipts, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(token, CAPPluginReturnPromise);
)
