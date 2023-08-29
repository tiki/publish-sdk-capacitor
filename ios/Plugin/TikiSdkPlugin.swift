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
    
    @objc func id(_ call: CAPPluginCall) {
        tikiSdk.getId(call: call)
    }
    
    @objc func address(_ call: CAPPluginCall) {
        tikiSdk.getAddress(call: call)
    }
    
    @objc func initialize(_ call: CAPPluginCall) async {
        await tikiSdk.initialize(call: call)
    }
    
    @objc func isInitialized(_ call: CAPPluginCall) {
        tikiSdk.isInitialized(call: call)
    }
    
    @objc func `guard`(_ call: CAPPluginCall) async {
        await trail.guard(call: call)
    }
    
    @objc func createTitle(_ call: CAPPluginCall) async {
        await title.create(call)
    }
    
    @objc func getTitle(_ call: CAPPluginCall) async {
        await title.get(call)
    }
    
    @objc func createLicense(_ call: CAPPluginCall) async {
        await license.create(call)
    }
    
    @objc func getLicense(_ call: CAPPluginCall) async {
        await license.get(call)
    }
    
    @objc func getLicenses(_ call: CAPPluginCall) async {
        await license.all(call)
    }
    
    @objc func createPayable(_ call: CAPPluginCall) async {
        await payable.create(call)
    }
    
    @objc func getPayable(_ call: CAPPluginCall) async {
        await payable.get(call)
    }
    
    @objc func getPayables(_ call: CAPPluginCall) async {
        await payable.all(call)
    }
    
    @objc func createReceipt(_ call: CAPPluginCall) async {
        await receipt.create(call)
    }
    
    @objc func getReceipt(_ call: CAPPluginCall) async {
        await receipt.get(call)
    }
    
    @objc func getReceipts(_ call: CAPPluginCall) async {
        await receipt.all(call)
    }
    
    @objc func token(_ call: CAPPluginCall) async {
        await idp.token(call)
    }

}
