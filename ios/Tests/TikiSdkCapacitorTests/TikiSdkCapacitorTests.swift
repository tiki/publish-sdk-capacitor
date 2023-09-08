import XCTest
import TikiSdk
@testable import Plugin

class TikiSdkTests: XCTestCase {
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }

    func testEcho() async {
        
            let implementation = try? await TikiSdk.config().initialize(id: "test123", publishingId: "4a03c7fc-1533-48f4-b0e7-c34e49af91cf")
            let value = "Hello, World!"
            
            XCTAssertEqual(1, 1)
    
    }
}
