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
class LicenseTest {
    private val tiki: TikiSdk = TikiSdk()
    private var id: String = "dummy"
    private var titleId: String = "dummy"

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
            titleId = title.getString("id")

            val uses: List<Use> = listOf(Use(listOf(Usecase.custom("test"))))
            call = PluginCallBuilder(
                JSONObject()
                    .put("titleId", titleId)
                    .put("terms", "No Terms. Testing.")
                    .put("uses", JSONArray(uses.map { use -> use.map() }))
            )
            tiki.trail.license.create(call.build())
            val res: JSONObject = call.complete.await()

            assertNotNull(res.get("id"))
            assertEquals(res.get("terms"), "No Terms. Testing.")
            assertEquals(res.getJSONArray("uses").length(), 1)
            assertEquals(
                res.getJSONArray("uses").getJSONObject(0).getJSONArray("usecases").get(0),
                Usecase.custom("test").value
            )
            id = res.getString("id")
        }
    }

    @Test
    fun get() = runTest {
        val call = PluginCallBuilder(JSONObject().put("id", id))
        tiki.trail.license.get(call.build())
        val res: JSONObject = call.complete.await()
        assertEquals(res.get("id"), id)
        assertEquals(res.get("terms"), "No Terms. Testing.")
        assertEquals(res.getJSONArray("uses").length(), 1)
        assertEquals(
            res.getJSONArray("uses").getJSONObject(0).getJSONArray("usecases").get(0),
            Usecase.custom("test").value
        )
    }

    @Test
    fun all() = runTest {
        val call = PluginCallBuilder(JSONObject().put("titleId", titleId))
        tiki.trail.license.all(call.build())
        val res: JSONObject = call.complete.await()
        assertEquals(res.getJSONArray("licenses").length(), 1)
        val obj: JSONObject = res.getJSONArray("licenses").getJSONObject(0)
        assertEquals(obj.get("id"), id)
        assertEquals(obj.get("terms"), "No Terms. Testing.")
        assertEquals(obj.getJSONArray("uses").length(), 1)
        assertEquals(
            obj.getJSONArray("uses").getJSONObject(0).getJSONArray("usecases").get(0),
            Usecase.custom("test").value
        )
    }
}