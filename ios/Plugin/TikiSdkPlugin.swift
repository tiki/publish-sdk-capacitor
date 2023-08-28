import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(TikiSdkPlugin)
public class TikiSdkPlugin: CAPPlugin {
    private let tikiSdk = TikiSdkCore()
    
    @objc func id(_ call: CAPPluginCall) {
        tikiSdk.getId(call: call)
    }
    
    @objc func address(_ call: CAPPluginCall) {
        tikiSdk.getAddress(call: call)
    }
    
    @objc func initialize(_ call: CAPPluginCall) async {
        await tikiSdk.initialize(call: call)
    }
    
    @objc func isInitialized(_ call: CAPPluginCall) {
        tikiSdk.isInitialized(call: call)
    }
    
    @objc func `guard`(_ call: CAPPluginCall) {
        
    }
    
    @objc func createTitle(_ call: CAPPluginCall) {

    }
    
    @objc func getTitle(_ call: CAPPluginCall) {

    }
    
    @objc func createLicense(_ call: CAPPluginCall) {

    }
    
    @objc func getLicense(_ call: CAPPluginCall) {

    }
    
    @objc func getLicenses(_ call: CAPPluginCall) {

    }
    
    @objc func createPayable(_ call: CAPPluginCall) {

    }
    
    @objc func getPayable(_ call: CAPPluginCall) {

    }
    
    @objc func getPayables(_ call: CAPPluginCall) {

    }
    
    @objc func createReceipt(_ call: CAPPluginCall) {

    }
    
    @objc func getReceipt(_ call: CAPPluginCall) {

    }
    
    @objc func getReceipts(_ call: CAPPluginCall) {

    }
    
    @objc func token(_ call: CAPPluginCall) {
        
    }

}
