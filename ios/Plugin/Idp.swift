/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import Capacitor
import TikiSdk


public class Idp{
    private var tiki: TikiSdk
    
    init(tiki: TikiSdk) {
        self.tiki = tiki
    }
    
    @objc public func token(_ call: CAPPluginCall) async {
        do{
            let token = try await tiki.idp.token()
            var ret = JSObject()
            ret["accessToken"] = token.accessToken
            ret["tokenType"] = token.tokenType
            ret["expires"] = token.expires
            ret["refreshToken"] = token.refreshToken
            ret["scope"] = token.scope
            call.resolve(ret)
        }catch{
            call.reject(error.localizedDescription)
        }
        
    }
    
}
