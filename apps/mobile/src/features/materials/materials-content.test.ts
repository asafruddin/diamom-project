import assert from "node:assert";
import test from "node:test";

import { hasUnsafeMedicalClaim } from "@/lib/copy-guardrails";

import {
  LABOR_DANCE_MOVEMENTS,
  MATERIAL_DETAILS,
  MATERIAL_ITEMS,
  MOVEMENTS_DETAIL,
  getMaterialByHref,
  getMaterialById,
  getMaterialNavigation,
  getMovementBySlug,
} from "./materials-content";

test("materials expose complete route metadata", () => {
  assert.ok(MATERIAL_ITEMS.length > 0);

  for (const item of MATERIAL_ITEMS) {
    const detail = getMaterialByHref(item.href);
    const navigation = getMaterialNavigation(item.href);

    assert.ok(detail, `missing detail for ${item.id}`);
    assert.strictEqual(detail?.id, item.id);
    assert.ok(item.title.length > 0);
    assert.ok(item.href.startsWith("/(tabs)/materials"));
    assert.ok(
      navigation.previous || navigation.next,
      `${item.id} should have previous or next navigation`,
    );
  }
});

test("missing material and movement content returns undefined", () => {
  assert.strictEqual(getMaterialById("missing"), undefined);
  assert.strictEqual(getMovementBySlug("missing"), undefined);
});

test("Labor Dance and movement content keep visible safety notes", () => {
  const laborDance = getMaterialById("labor-dance");

  assert.ok(laborDance);
  assert.ok(laborDance.safetyNotes.length >= 2);
  assert.ok(MOVEMENTS_DETAIL.safetyNotes.length >= 2);

  for (const movement of LABOR_DANCE_MOVEMENTS) {
    assert.ok(
      movement.whenToStop.length >= 1,
      `${movement.slug} should explain when to stop`,
    );
  }
});

test("material copy avoids known unsafe medical claims", () => {
  const copy = MATERIAL_DETAILS.flatMap((material) => [
    material.title,
    material.description,
    material.heroTitle,
    material.heroDetail,
    ...material.safetyNotes,
    ...material.sections.flatMap((section) => [
      section.title,
      section.body ?? "",
      ...(section.bullets ?? []),
    ]),
    ...(material.movementGroups?.flatMap((group) => [
      group.title,
      group.description,
      ...group.steps,
    ]) ?? []),
  ]).join(" ");

  assert.strictEqual(hasUnsafeMedicalClaim(copy), false);
});
