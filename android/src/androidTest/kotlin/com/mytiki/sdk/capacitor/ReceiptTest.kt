/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.mytiki.sdk.capacitor.fixtures.PluginCallBuilder
import com.mytiki.sdk.capacitor.fixtures.TikiSdkInit
import com.mytiki.tiki_sdk_android.trail.Tag
import com.mytiki.tiki_sdk_android.trail.Use
import com.mytiki.tiki_sdk_android.trail.Usecase
import junit.framework.TestCase.*
import kotlinx.coroutines.test.runTest
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Test
import org.junit.runner.RunWith
import java.util.UUID

@RunWith(AndroidJUnit4::class)
class ReceiptTest {
    private val tiki: TikiSdk = TikiSdk()
    private var id: String = "dummy"
    private var payableId: String = "dummy"

    init {
        TikiSdkInit(tiki)
        runTest {
            var call = PluginCallBuilder(
                JSONObject()
                    .put("ptr", UUID.randomUUID().toString())
                    .put("tags", JSONArray(listOf(Tag.custom("test").value)))
            )
            tiki.trail.title.create(call.build())
            val title: JSONObject = call.complete.await()
            val titleId = title.getString("id")

            val uses: List<Use> = listOf(Use(listOf(Usecase.custom("test"))))
            call = PluginCallBuilder(
                JSONObject()
                    .put("titleId", titleId)
                    .put("terms", "No Terms. Testing.")
                    .put("uses", JSONArray(uses.map { use -> use.map() }))
            )
            tiki.trail.license.create(call.build())
            val license: JSONObject = call.complete.await()
            val licenseId = license.getString("id")

            call = PluginCallBuilder(
                JSONObject()
                    .put("licenseId", licenseId)
                    .put("amount", "0")
                    .put("type", "fake")
            )
            tiki.trail.payable.create(call.build())
            val payable: JSONObject = call.complete.await()
            payableId = payable.getString("id")

            call = PluginCallBuilder(
                JSONObject()
                    .put("payableId", payableId)
                    .put("amount", "0")
            )
            tiki.trail.receipt.create(call.build())
            val res: JSONObject = call.complete.await()

            assertNotNull(res.get("id"))
            assertEquals(res.get("amount"), "0")
            id = res.getString("id")
        }
    }

    @Test
    fun get() = runTest {
        val call = PluginCallBuilder(JSONObject().put("id", id))
        tiki.trail.receipt.get(call.build())
        val res: JSONObject = call.complete.await()
        assertEquals(res.get("id"), id)
        assertEquals(res.get("amount"), "0")
    }

    @Test
    fun all() = runTest {
        val call = PluginCallBuilder(JSONObject().put("payableId", payableId))
        tiki.trail.receipt.all(call.build())
        val res: JSONObject = call.complete.await()
        assertEquals(res.getJSONArray("receipts").length(), 1)
        val obj: JSONObject = res.getJSONArray("receipts").getJSONObject(0)
        assertEquals(obj.get("id"), id)
        assertEquals(obj.get("amount"), "0")
    }
}