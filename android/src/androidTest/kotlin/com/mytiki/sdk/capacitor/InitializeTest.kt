/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import android.content.Context
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.mytiki.sdk.capacitor.fixtures.PluginCallBuilder
import junit.framework.TestCase.*
import kotlinx.coroutines.test.runTest
import org.json.JSONObject
import org.junit.Test
import org.junit.runner.RunWith
import java.util.UUID

@RunWith(AndroidJUnit4::class)
class InitializeTest {
    private val tiki: TikiSdk = TikiSdk()
    private val appContext: Context =
        InstrumentationRegistry.getInstrumentation().getTargetContext();

    @Test
    fun initialize() = runTest {
        val call = PluginCallBuilder()
            .req(
                JSONObject()
                    .put("id", UUID.randomUUID().toString())
                    .put("publishingId", "be19730a-00d5-45f5-b18e-2e19eb25f311")
            )
        tiki.initialize(call.build(), appContext)
        val res: JSONObject = call.complete.await()

        assertNotNull(res.get("address"))
        assertEquals(call.req?.get("id"), res.get("id"))
    }
}