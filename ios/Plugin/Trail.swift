/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import Capacitor
import TikiSdk

@objc public class Trail: NSObject {
    public var title: Title
    public var license: License
    public var payable: Payable
    public var receipt: Receipt
    
    private var tiki: TikiSdk
    
    init(tiki: TikiSdk) {
        self.tiki = tiki
        self.title = Title(tiki: tiki)
        self.license = License(tiki: tiki)
        self.payable = Payable(tiki: tiki)
        self.receipt = Receipt(tiki: tiki)
    }
    
    @objc public func `guard`(call: CAPPluginCall) async{
        let usecasesArray = call.getArray("usecases") as? [String] ?? []
        let usecases: [Usecase] = usecasesArray.compactMap { usecaseString in
            return Usecase.from(usecase: usecaseString)
        }
        let destinations = call.getArray("destinations") as? [String] ?? []
        let ptr = call.getString("ptr") ?? ""
        do{
            let _ = try await tiki.trail.guard(
                ptr: ptr, usecases: usecases, destinations: destinations,
                onPass: { call.resolve([:]) },
                onFail: { reason in call.reject(reason ?? "Not allowed.") }
                )
        }catch{
            call.reject(error.localizedDescription)
        }
    }
}
