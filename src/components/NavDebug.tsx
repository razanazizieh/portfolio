/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { getNavDebugData, subscribeNavDebug } from "../lib/scroll";

/**
 * NavDebug Overlay:
 * Visible when ?debug=nav is in URL query parameters.
 * Displays:
 * - last action
 * - ms from click to scroll start
 * - ms from click to scroll end
 * - number of pending reveal groups after the scroll ended (expected 0 after 600ms)
 * - number of active scroll locks
 */
export function NavDebug() {
  const [data, setData] = useState(() => getNavDebugData());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "nav") {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    return subscribeNavDebug(setData);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[9999] bg-[#141414]/90 text-[#F5F4F0] p-3 text-xs font-mono rounded shadow-lg pointer-events-none border border-neutral-700"
      style={{ minWidth: "260px" }}
    >
      <div className="font-bold border-b border-neutral-700 pb-1 mb-2">
        NAV DEBUG (?debug=nav)
      </div>
      <div>Last action: {data.lastAction || "none"}</div>
      <div>Click &rarr; scroll start: {data.clickToStartMs}ms</div>
      <div>Click &rarr; scroll end: {data.clickToEndMs}ms</div>
      <div>
        Pending reveal groups:{" "}
        <span style={{ color: data.pendingRevealCount === 0 ? "#4ADE80" : "#FACC15" }}>
          {data.pendingRevealCount}
        </span>{" "}
        (after scroll)
      </div>
      <div>Active scroll locks: {data.activeScrollLocks}</div>
    </div>
  );
}

export default NavDebug;
