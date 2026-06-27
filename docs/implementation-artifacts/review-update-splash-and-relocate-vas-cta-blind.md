# Blind Hunter Review Prompt

Use the `bmad-review-adversarial-general` skill. You have no conversation context, spec, or project access. Review only the diff below with extreme skepticism and return a Markdown list of finding descriptions only.

```diff
diff --git a/apps/mobile/app.json b/apps/mobile/app.json
--- a/apps/mobile/app.json
+++ b/apps/mobile/app.json
@@
-          "image": "./assets/icon/splash-screen.png",
+          "image": "./assets/icon/diamom-logo.png",
@@
-            "image": "./assets/icon/splash-screen.png",
+            "image": "./assets/icon/diamom-logo.png",
@@
-            "image": "./assets/icon/splash-screen.png",
+            "image": "./assets/icon/diamom-logo.png",
diff --git a/apps/mobile/app/(tabs)/materials/closing.tsx b/apps/mobile/app/(tabs)/materials/closing.tsx
--- a/apps/mobile/app/(tabs)/materials/closing.tsx
+++ b/apps/mobile/app/(tabs)/materials/closing.tsx
@@
 import { Image } from "expo-image";
+import { router } from "expo-router";
 import { StyleSheet, Text, View } from "react-native";
 
-import { DiaScreen } from "@/components/dia-ui";
+import { ActionButton, DiaScreen } from "@/components/dia-ui";
@@
+      <ActionButton
+        accessibilityLabel="Lanjut ke penilaian VAS"
+        label="Lanjut ke Penilaian VAS"
+        onPress={() => router.push("/(tabs)/vas")}
+      />
     </DiaScreen>
diff --git a/apps/mobile/app/(tabs)/materials/movement/[slug].tsx b/apps/mobile/app/(tabs)/materials/movement/[slug].tsx
--- a/apps/mobile/app/(tabs)/materials/movement/[slug].tsx
+++ b/apps/mobile/app/(tabs)/materials/movement/[slug].tsx
@@
-      <ActionButton
-        accessibilityLabel="Lanjut ke penilaian VAS"
-        label="Lanjut ke Penilaian VAS"
-        onPress={() => router.push("/(tabs)/vas")}
-      />
     </DiaScreen>
```
