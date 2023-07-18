/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor.fixtures

import android.content.Context
import androidx.test.platform.app.InstrumentationRegistry
import com.mytiki.sdk.capacitor.TikiSdk
import junit.framework.TestCase
import kotlinx.coroutines.test.runTest
import org.json.JSONObject
import java.util.UUID

class TikiSdkInit(tiki: TikiSdk) {
    var id = "not initialized"
    var address = "not initialized"

    init {
        runTest {
            val appContext: Context =
                InstrumentationRegistry.getInstrumentation().targetContext;
            val publishingId: String =
                InstrumentationRegistry.getArguments().getString("publishingId")!!
            val call = PluginCallBuilder(
                JSONObject()
                    .put("id", UUID.randomUUID().toString())
                    .put("publishingId", publishingId)
            )

            tiki.initialize(call.build(), appContext)
            val res: JSONObject = call.complete.await()

            TestCase.assertNotNull(res.get("address"))
            TestCase.assertEquals(call.req?.get("id"), res.get("id"))

            address = res.getString("address")
            id = res.getString("id")
        }
    }
}