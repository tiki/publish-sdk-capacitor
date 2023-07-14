package com.mytiki.sdk.capcitor

import android.util.Log
import com.mytiki.tiki_sdk_android.TikiSdk

class TikiSdkCjs {
    fun echo(value: String): String {
        TikiSdk.trail.title.create()
        Log.i("Echo", value)
        return value
    }
}
