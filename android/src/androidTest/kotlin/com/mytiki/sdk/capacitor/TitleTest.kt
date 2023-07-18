/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.mytiki.sdk.capacitor.fixtures.PluginCallBuilder
import com.mytiki.sdk.capacitor.fixtures.TikiSdkInit
import com.mytiki.tiki_sdk_android.trail.Tag
import junit.framework.TestCase.*
import kotlinx.coroutines.test.runTest
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Test
import org.junit.runner.RunWith
import java.util.UUID

@RunWith(AndroidJUnit4::class)
class TitleTest {
    private val tiki: TikiSdk = TikiSdk()
    private var id: String = "dummy"
    private val ptr: String = UUID.randomUUID().toString()

    init {
        TikiSdkInit(tiki)
        runTest {
            val call = PluginCallBuilder(
                JSONObject()
                    .put("ptr", ptr)
                    .put("tags", JSONArray(listOf(Tag.custom("test").value)))
            )
            tiki.trail.title.create(call.build())
            val res: JSONObject = call.complete.await()
            assertNotNull(res.get("id"))
            assertNotNull(res.get("hashedPtr"))
            assertEquals(res.getJSONArray("tags").length(), 1)
            assertEquals(res.getJSONArray("tags")[0], Tag.custom("test").value)
            id = res.getString("id")
        }
    }

    @Test
    fun get() = runTest {
        val call = PluginCallBuilder(JSONObject().put("ptr", ptr))
        tiki.trail.title.get(call.build())
        val res: JSONObject = call.complete.await()
        assertEquals(res.get("id"), id)
        assertNotNull(res.get("hashedPtr"))
        assertEquals(res.getJSONArray("tags").length(), 1)
        assertEquals(res.getJSONArray("tags")[0], Tag.custom("test").value)
    }
}