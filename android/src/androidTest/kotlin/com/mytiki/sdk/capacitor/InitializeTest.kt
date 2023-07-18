/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.mytiki.sdk.capacitor.fixtures.PluginCallBuilder
import com.mytiki.sdk.capacitor.fixtures.TikiSdkInit
import junit.framework.TestCase.*
import kotlinx.coroutines.test.runTest
import org.json.JSONObject
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class InitializeTest {
    private val tiki: TikiSdk = TikiSdk()
    private var address: String = "dummy";
    private var id: String = "dummy";

    init {
        val init = TikiSdkInit(tiki)
        address = init.address
        id = init.id
    }

    @Test
    fun address() = runTest {
        val call = PluginCallBuilder()
        tiki.address(call.build())
        val res: JSONObject = call.complete.await()
        assertEquals(address, res.get("address"))
    }

    @Test
    fun id() = runTest {
        val call = PluginCallBuilder()
        tiki.id(call.build())
        val res: JSONObject = call.complete.await()
        assertEquals(id, res.get("id"))
    }

    @Test
    fun isInitialized() = runTest {
        val call = PluginCallBuilder()
        tiki.isInitialized(call.build())
        val res: JSONObject = call.complete.await()
        assertEquals(res.get("isInitialized"), true)
    }
}