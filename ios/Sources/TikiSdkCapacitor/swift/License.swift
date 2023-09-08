/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import Capacitor
import TikiSdk

class License{
    
    public var tikiSdk = TikiSdk.config()
    
    @objc func create(_ call: CAPPluginCall) async {
        do{
            guard let titleId = call.getString("titleId"),
                  let usecases = call.getArray("usecases").map({ arr in
                      arr.map{ usecase in Usecase(usecase as! String) }
                  }),
                  let terms = call.getString("terms") else{
                      call.reject("Please provide titleId and ")
                      return
                  }
            let destinations = call.getArray("destinations") as? [String]
            let usecase = Use(usecases: usecases, destinations: destinations)
            let expiry = call.getInt("expiry") != nil ? Date(milliseconds: Int64(exactly: call.getInt("expiry")!)!) : nil
            let description = call.getString("description")
            
            let license = try await tikiSdk.trail.license.create(
                titleId: titleId,
                uses: [],
                terms: terms,
                expiry: expiry,
                description: description
            )
            
            if(license != nil){
                call.resolve(License.toJS(license!))
            }else{
                call.resolve()
            }
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func get(_ call: CAPPluginCall) async {
        do{
            guard let id = call.getString("id") else {
                call.reject("Please provide the id of the License")
                return
            }
            let license = try await tikiSdk.trail.license.get(
                id: id
            )
            if(license != nil){
                call.resolve(License.toJS(license!))
            }else{
                call.resolve()
            }
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func all(_ call: CAPPluginCall) async {
        do{
            guard let titleId = call.getString("titleId") else {
                call.reject("Please provide titleId, amount and type in plugin call")
                return
            }
            let license = try await tikiSdk.trail.license.all(
                titleId: titleId
            )
            call.resolve(["licenses": license.map{p in License.toJS(p)}])
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    static public func toJS(_ license: LicenseRecord) -> JSObject{
        var ret = JSObject()
        ret["id"] = license.id
        ret["title"] = Title.toJS(license.title)
        ret["uses"] = license.uses
        ret["terms"] = license.terms
        ret["description"] = license.description
        ret["expiry"] = license.expiry
        return ret
    }
}
