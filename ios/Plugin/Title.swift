/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import TikiSdk
import Capacitor

public class Title{
    
    public var tikiSdk = TikiSdk.config()

    @objc func create(_ call: CAPPluginCall) async{
        do{
            let ptr = call.getString("ptr")
            let tags = call.getArray("tags").map{ arr in
                arr.map{ tag in Tag.from(tag: tag as! String) }
            }
            guard ptr != nil, !ptr!.isEmpty, tags != nil, !tags!.isEmpty else{
                call.reject("Please provide PTR and tags. They are required for Title creation.")
                return
            }
            let description = call.getString("description")
            let origin = call.getString("origin")
            let title = try await tikiSdk.trail.title.create(ptr: ptr!, tags: tags!, description: description, origin: origin)
            call.resolve(Title.toJS(title!))
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func get(_ call: CAPPluginCall) async{
        do{
            guard let ptr = call.getString("ptr") else{
                call.reject("Please provide PTR in plugin call.")
                return
            }
            let origin = call.getString("origin")
            let title = try await tikiSdk.trail.title.get(ptr: ptr, origin: origin)
            if(title == nil){
                call.resolve([:])
            }else{
                call.resolve(Title.toJS(title!))
            }
        }catch{
            call.reject(error.localizedDescription)
        }
    }

    @objc func id(_ call: CAPPluginCall) async{
        do{
            guard let id = call.getString("id") else{
                call.reject("Please provide id in plugin call.")
                return
            }
            let title = try await tikiSdk.trail.title.id(id: id)
            if(title == nil){
                call.resolve([:])
            }else{
                call.resolve(Title.toJS(title!))
            }
        }catch{
            call.reject(error.localizedDescription)
        }
    }
    
    
    public static func toJS(_ title:TitleRecord) -> JSObject{
        var ret = JSObject()
        ret["hashedPtr"] = title.hashedPtr
        ret["description"] = title.description
        ret["id"] = title.id
        ret["tags"] = title.tags.map{tag in tag.toString()}
        ret["origin"] = title.origin
        return ret
    }
}
