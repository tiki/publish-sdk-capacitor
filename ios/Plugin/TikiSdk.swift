import Foundation
import TikiSdk
import Capacitor

@objc public class TikiSdkCore: NSObject {

    private var id: String?
    private var address: String?

    func initialize(call: CAPPluginCall) async {
        do{
            let userId = call.getString("userId")!
            let publishingId = call.getString("publishingId")!
            try await TikiSdk.config().initialize(id: userId,  publishingId: publishingId)
            self.address = try TikiSdk.address
            self.id = userId
            var ret = JSObject()
            ret["id"] = id
            ret["address"] = address
            call.resolve(ret)
        }catch{
            call.reject("Tiki Sdk failed to initialize: \(error)")
        }
    }

    func getId(call: CAPPluginCall) {
        var ret = JSObject()
        ret["id"] = id
        call.resolve(ret)
    }

    func getAddress(call: CAPPluginCall) {
        var ret = JSObject()
        ret["address"] = address
        call.resolve(ret)
    }

    func isInitialized(call: CAPPluginCall) {
        var ret = JSObject()
        ret["isInitialized"] = address != nil
        call.resolve(ret)
    }

}
