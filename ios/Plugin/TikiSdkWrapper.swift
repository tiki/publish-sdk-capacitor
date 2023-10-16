/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import TikiSdk
import Capacitor

@objc public class TikiSdkWrapper: NSObject {
    public var idp: Idp
    public var trail: Trail
    
    private var id: String?
    private var address: String?
    private var tiki: TikiSdk
    
    override init(){
        self.tiki = TikiSdk.config()
        self.idp = Idp(tiki: tiki)
        self.trail = Trail(tiki: tiki)
    }

    @objc func initialize(call: CAPPluginCall) {
            Task {
                let userId = call.getString("id")!
                let publishingId = call.getString("publishingId")!
                do{
                    try await tiki.initialize(id: userId,  publishingId: publishingId) {
                        do{
                            self.address = try TikiSdk.address
                            self.id = userId
                            var ret = JSObject()
                            ret["id"] = self.id
                            ret["address"] = self.address
                            call.resolve(ret)
                        }catch{
                            call.reject("Tiki Sdk failed to initialize: \(error)")
                        }
                    }
                }catch{
                    call.reject("Tiki Sdk failed to initialize: \(error)")
                }
            }
    }

    @objc func getId(call: CAPPluginCall) {
        var ret = JSObject()
        ret["id"] = id
        call.resolve(ret)
    }

    @objc func getAddress(call: CAPPluginCall) {
        var ret = JSObject()
        ret["address"] = address
        call.resolve(ret)
    }

    @objc func isInitialized(call: CAPPluginCall) {
        var ret = JSObject()
        ret["isInitialized"] = address != nil
        call.resolve(ret)
    }

}
