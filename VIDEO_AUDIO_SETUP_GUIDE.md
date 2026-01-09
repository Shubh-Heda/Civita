# 🎥 Video & Audio Streaming Guide

## ✅ **What I Fixed:**

### **Improvements Made:**
1. ✅ **Enhanced ICE servers** - Added multiple STUN servers for better NAT traversal
2. ✅ **Better logging** - Console shows WebRTC connection status  
3. ✅ **Automatic peer discovery** - When new users join, connections auto-establish
4. ✅ **Improved track handling** - Ensures audio/video tracks are properly added
5. ✅ **Error handling** - Better error messages for debugging

---

## 🧪 **How to Test (Step-by-Step):**

### **Option 1: Test with Two Browsers**

1. **Open Chrome:**
   - Go to: https://shubh-heda.github.io/Avento/
   - Sign up with email: `user1@test.com`
   - Click on **Vibe Rooms** or **Discord Rooms**
   - Join a room
   - **Allow camera & microphone** when prompted
   - Turn on camera & mic

2. **Open Firefox (or Chrome Incognito):**
   - Go to: https://shubh-heda.github.io/Avento/
   - Sign up with email: `user2@test.com`
   - Join the **same room**
   - **Allow camera & microphone** when prompted
   - Turn on camera & mic

3. **You should now:**
   - ✅ See both users' video feeds
   - ✅ Hear each other's audio
   - ✅ See "2 members connected" in the room

---

### **Option 2: Test with a Friend**

1. **You:**
   - Visit: https://shubh-heda.github.io/Avento/
   - Sign up and join a room
   - Turn on camera/mic

2. **Friend:**
   - Visit the same URL
   - Sign up with different email
   - Join the same room
   - Turn on camera/mic

3. **Both should see/hear each other!**

---

## 🔍 **Debugging (If It Doesn't Work):**

### **Open Browser Console** (Press F12)

You should see logs like:
```
👥 Presence updated: 2 users
📢 Offering to peers: ['other-user-id']
➕ Adding track before offer: audio
➕ Adding track before offer: video
📤 Sending offer to other-user-id
📡 Received signal: offer from other-user-id
📹 Received track from other-user-id audio
📹 Received track from other-user-id video
✅ Setting remote stream for other-user-id
🔗 Connection state with other-user-id: connected
```

### **Common Issues:**

#### **Issue 1: "Permission Denied" for Camera/Mic**
**Solution:** 
- Click the camera icon in browser address bar
- Allow camera & microphone permissions
- Refresh the page

#### **Issue 2: Can hear audio but no video**
**Solution:**
- Make sure BOTH users click the "Camera On" button
- Check if other user's camera is actually on

#### **Issue 3: Can't see/hear other user at all**
**Possible Causes:**
- **Firewall/Network:** Some corporate networks block WebRTC
- **Need TURN server:** In strict NAT situations, STUN alone isn't enough

**Try:**
- Test on mobile data instead of corporate WiFi
- Test from home network
- Both users should be on different networks (or one on mobile data)

#### **Issue 4: Console shows errors**
**Look for:**
- `❌` symbols in console - these show errors
- Share the error message for more specific help

---

## 🌐 **Network Requirements:**

### **For Best Results:**
- ✅ Users on different networks (not same WiFi)
- ✅ Modern browser (Chrome, Firefox, Edge, Safari)
- ✅ HTTPS connection (Vercel provides this automatically)
- ✅ Camera & microphone permissions allowed

### **Known Limitations:**
- ⚠️ **Corporate networks** - May block WebRTC traffic
- ⚠️ **Symmetric NAT** - May need paid TURN servers
- ⚠️ **Same network** - Sometimes works, sometimes doesn't

---

## 🚀 **How It Works (Technical):**

1. **User A joins room:**
   - Gets camera/mic access
   - Announces presence via Supabase Realtime

2. **User B joins same room:**
   - Sees User A in presence
   - Creates WebRTC peer connection
   - Sends "offer" via Supabase

3. **User A receives offer:**
   - Creates peer connection
   - Sends "answer" back

4. **ICE candidates exchange:**
   - Both users exchange network info
   - WebRTC finds best connection path

5. **Media streams flow:**
   - Direct peer-to-peer video/audio
   - No server in the middle (except for signaling)

---

## 📊 **Testing Checklist:**

- [ ] Camera permission granted
- [ ] Microphone permission granted  
- [ ] "Camera On" button clicked
- [ ] "Unmute" button clicked
- [ ] Other user is in the same room
- [ ] Other user has camera/mic on
- [ ] Console shows no errors
- [ ] Browser is up-to-date

---

## 🆘 **Still Not Working?**

1. **Check Console Logs** (F12)
2. **Try different browser**
3. **Try mobile data instead of WiFi**
4. **Test with a friend on different network**
5. **Share console errors** for specific help

---

## 🔧 **Advanced: Adding TURN Server (If Needed)**

If users are behind strict firewalls, you may need a TURN server.

**Free TURN Server Options:**
- Metered.ca (Free tier: 50GB/month)
- Xirsys (Free tier available)

**To add TURN server**, edit the ICE servers in:
`src/lib/hooks/useVibeRooms.ts` (line ~187):

```typescript
iceServers: [
  { urls: 'stun:stun.l.google.com:19302' },
  {
    urls: 'turn:your-turn-server.com:3478',
    username: 'your-username',
    credential: 'your-password'
  }
]
```

---

## ✨ **Your Live URL:**

**Main:** https://shubh-heda.github.io/Avento/

Share this with anyone to test!
