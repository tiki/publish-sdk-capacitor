/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import Capacitor
import TikiSdk

@objc public class Trail: NSObject {
    
    public var tikiSdk = TikiSdk.instance
    
    @objc public func `guard`(call: CAPPluginCall) async{
        let usecasesArray = call.getArray("usecases") as? [String] ?? []
        let usecases: [Usecase] = usecasesArray.compactMap { usecaseString in
            return Usecase(usecaseString)
        }
        let destinations = call.getArray("destinations") as? [String] ?? []
        let ptr = call.getString("ptr") ?? ""
        do{
            let _ = try await tikiSdk.trail.guard(
                ptr: ptr, usecases: usecases, destinations: destinations,
                onPass: { call.resolve([:]) },
                onFail: { reason in call.reject(reason ?? "Not allowed.") }
                )
        }catch{
            call.reject(error.localizedDescription)
        }
    }
}
