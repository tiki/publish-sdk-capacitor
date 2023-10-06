/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Foundation
import TikiSdk
import Capacitor

@objc(TikiSdkPlugin)
public class TikiSdkPlugin: CAPPlugin {
    private let tikiSdk = TikiSdkCore()
    private let trail = Trail()
    private let title = Title()
    private let license = License()
    private let payable = Payable()
    private let receipt = Receipt()
    private let idp = Idp()
    
    @objc public func id(_ call: CAPPluginCall) {
        tikiSdk.getId(call: call)
    }
    
    @objc public func address(_ call: CAPPluginCall) {
        tikiSdk.getAddress(call: call)
    }
    
    @objc public func initialize(_ call: CAPPluginCall) {
        tikiSdk.initialize(call: call)
    }
    
    @objc public func isInitialized(_ call: CAPPluginCall) {
        tikiSdk.isInitialized(call: call)
    }
    
    @objc public func `guard`(_ call: CAPPluginCall) {
        Task{
            await trail.guard(call: call)
        }
    }
    
    @objc public func createTitle(_ call: CAPPluginCall) {
        Task{
            await title.create(call)
        }
    }
    
    @objc public func getTitle(_ call: CAPPluginCall) {
        Task{
            await title.get(call)
        }
    }
    
    @objc public func createLicense(_ call: CAPPluginCall) {
        Task{
            await license.create(call)
        }
    }
    
    @objc public func getLicense(_ call: CAPPluginCall) {
        Task{
            await license.get(call)
        }
    }
    
    @objc public func getLicenses(_ call: CAPPluginCall) {
        Task{
            await license.all(call)
        }
    }
    
    @objc public func createPayable(_ call: CAPPluginCall) {
        Task{
            await payable.create(call)
        }
    }
    
    @objc public func getPayable(_ call: CAPPluginCall) {
        Task{
            await payable.get(call)
        }
    }
    
    @objc public func getPayables(_ call: CAPPluginCall) {
        Task{
            await payable.all(call)
        }
    }
    
    @objc public func createReceipt(_ call: CAPPluginCall) {
        Task{
            await receipt.create(call)
        }
    }
    
    @objc public func getReceipt(_ call: CAPPluginCall) {
        Task{
            await receipt.get(call)
        }
    }
    
    @objc public func getReceipts(_ call: CAPPluginCall) {
        Task{
            await receipt.all(call)
        }
    }
    
    @objc public func token(_ call: CAPPluginCall) {
        Task{
            await idp.token(call)
        }
    }

}
