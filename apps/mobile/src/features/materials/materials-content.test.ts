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

test("all materials have illustration assets where required", () => {
  for (const item of MATERIAL_ITEMS) {
    // closing (Penutup) is allowed to not have a thumbnail
    if (item.id !== "closing") {
      assert.ok(
        item.thumbnail,
        `${item.id} should have a thumbnail image`,
      );
    }
  }

  const breathingExercises = [
    { id: "deep-breath", title: "Napas Dalam" },
    { id: "long-breath", title: "Napas Panjang" },
    { id: "short-breath", title: "Napas Pendek" },
    { id: "relax-breath", title: "Napas Relaksasi" },
  ];

  for (const exercise of breathingExercises) {
    assert.ok(
      exercise.id,
      `breathing exercise should exist`,
    );
  }

  const movements = [
    { slug: "goyang-pinggul", title: "Goyang Pinggul" },
    { slug: "gerakan-melingkar", title: "Gerakan Melingkar" },
    { slug: "jongkok", title: "Jongkok" },
    { slug: "condong-ke-depan", title: "Condong ke Depan" },
    { slug: "gerakan-kupu-kupu", title: "Gerakan Kupu-Kupu" },
    { slug: "berdiri-relaksasi", title: "Berdiri & Relaksasi" },
  ];

  for (const movement of movements) {
    const found = movements.find((m) => m.slug === movement.slug);
    assert.ok(
      found,
      `movement ${movement.slug} should exist`,
    );
  }

  for (const material of MATERIAL_DETAILS) {
    if (material.id !== "closing") {
      assert.ok(
        material.heroImage,
        `material ${material.id} should have a heroImage`,
      );
    }
  }
});
