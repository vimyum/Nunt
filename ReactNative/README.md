## How to upload file to S3.

```bash
vim node_modules/react-native/Libraries/Network/RCTHTTPRequestHandler.mm
```

Add below function to right after the line of `#pragma mark - NSURLSession delegate`.


```swift
- (void)URLSession:(NSURLSession *)session didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
{
      completionHandler(NSURLSessionAuthChallengeUseCredential, [NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust]);
}
```

## You might need to add followings to Info.plist

```xml
<key>NSAppTransportSecurity</key>
  <dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
  </dict>
```
