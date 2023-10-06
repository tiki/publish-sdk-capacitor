/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import Capacitor
import TikiSdk

public class Receipt{
    
    public var tikiSdk = TikiSdk.config()
    
    @objc func create(_ call: CAPPluginCall) async {
        do{
            guard let payableId = call.getString("payableId"),
                  let amount = call.getString("amount") else{
                call.reject("Please provide payableId and amount to create a receipt.")
                return
            }
            let description = call.getString("description")
            let reference = call.getString("reference")

            let receipt = try await tikiSdk.trail.receipt.create(
                payableId: payableId,
                amount: amount,
                description: description,
                reference: reference
            )
            
            if(receipt != nil){
                call.resolve(Receipt.toJS(receipt!))
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
                call.reject("Please provide the id of the Receipt")
                return
            }
            let receipt = try await tikiSdk.trail.receipt.get(
                id: id
            )
            if(receipt != nil){
                call.resolve(Receipt.toJS(receipt!))
            }else{
                call.resolve([:])
            }
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func all(_ call: CAPPluginCall) async {
        do{
            guard let payableId = call.getString("payableId") else {
                call.reject("Please provide payableId, amount and type in plugin call")
                return
            }
            let receipt = try await tikiSdk.trail.receipt.all(
                payableId: payableId
            )
            call.resolve(["receipts": receipt.map{p in Receipt.toJS(p)}])
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    static private func toJS(_ receipt: ReceiptRecord) -> JSObject{
        var ret = JSObject()
        ret["id"] = receipt.id
        ret["payable"] = Payable.toJS(receipt.payable)
        ret["amount"] = receipt.amount
        ret["description"] = receipt.description
        ret["reference"] = receipt.reference
        return ret
    }
}
