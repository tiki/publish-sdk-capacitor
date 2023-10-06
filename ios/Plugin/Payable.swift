/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import Capacitor
import TikiSdk

public class Payable{
    
    public var tikiSdk = TikiSdk.config()
    
    @objc func create(_ call: CAPPluginCall) async {
        do{
            guard let licenseId = call.getString("licenseId"),
                  let amount = call.getString("amount"),
                  let type = call.getString("type") else {
                call.reject("Please provide licenseId, amount and type in plugin call")
                return
            }
            let expiry = call.getInt("expiry") != nil ? Date(milliseconds: Int64(exactly: call.getInt("expiry")!)!) : nil
            let description = call.getString("description")
            let reference = call.getString("reference")
            let payable = try await tikiSdk.trail.payable.create(
                licenseId: licenseId,
                amount: amount,
                type: type,
                expiry: expiry,
                description: description,
                reference: reference
            )
            if(payable != nil){
                call.resolve(Payable.toJS(payable!))
            }else{
                call.resolve([:])
            }
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func get(_ call: CAPPluginCall) async {
        do{
            guard let id = call.getString("id") else {
                call.reject("Please provide the id of the Payable")
                return
            }
            let payable = try await tikiSdk.trail.payable.get(
                id: id
            )
            if(payable != nil){
                call.resolve(Payable.toJS(payable!))
            }else{
                call.resolve([:])
            }
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func all(_ call: CAPPluginCall) async {
        do{
            guard let licenseId = call.getString("licenseId") else {
                call.reject("Please provide licenseId, amount and type in plugin call")
                return
            }
            let payable = try await tikiSdk.trail.payable.all(
                licenseId: licenseId
            )
            call.resolve(["payables": payable.map{p in Payable.toJS(p)}])
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    static public func toJS(_ payable: PayableRecord) -> JSObject{
        var ret = JSObject()
        ret["id"] = payable.id
        ret["license"] = License.toJS(payable.license)
        ret["amount"] = payable.amount
        ret["type"] = payable.type
        ret["description"] = payable.description
        ret["expiry"] = payable.expiry
        ret["reference"] = payable.reference
        return ret
    }
}
