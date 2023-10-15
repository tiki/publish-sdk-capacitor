/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import TikiSdk
import Capacitor

@objc(TikiSdkPlugin)
public class TikiSdkPlugin: CAPPlugin {
    private let tiki = TikiSdkWrapper()
    
    @objc public func id(_ call: CAPPluginCall) {
        tiki.getId(call: call)
    }
    
    @objc public func address(_ call: CAPPluginCall) {
        tiki.getAddress(call: call)
    }
    
    @objc public func initialize(_ call: CAPPluginCall) {
        tiki.initialize(call: call)
    }
    
    @objc public func isInitialized(_ call: CAPPluginCall) {
        tiki.isInitialized(call: call)
    }
    
    @objc public func `guard`(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.guard(call: call)
        }
    }
    
    @objc public func createTitle(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.title.create(call)
        }
    }
    
    @objc public func getTitle(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.title.get(call)
        }
    }
    
    @objc public func createLicense(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.license.create(call)
        }
    }
    
    @objc public func getLicense(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.license.get(call)
        }
    }
    
    @objc public func getLicenses(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.license.all(call)
        }
    }
    
    @objc public func createPayable(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.payable.create(call)
        }
    }
    
    @objc public func getPayable(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.payable.get(call)
        }
    }
    
    @objc public func getPayables(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.payable.all(call)
        }
    }
    
    @objc public func createReceipt(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.receipt.create(call)
        }
    }
    
    @objc public func getReceipt(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.receipt.get(call)
        }
    }
    
    @objc public func getReceipts(_ call: CAPPluginCall) {
        Task{
            await tiki.trail.receipt.all(call)
        }
    }
    
    @objc public func token(_ call: CAPPluginCall) {
        Task{
            await tiki.idp.token(call)
        }
    }

}
