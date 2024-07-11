"use client";

import { useAtom, useSetAtom } from "jotai";
import { settingsAtom } from "@/state/settings";
import { windowsListAtom } from "@/state/windowsList";
import styles from "./Settings.module.css";
import cx from "classnames";
import { ModelSection } from "../ModelSection";
import { useFlags } from "@/flags/context";

export function Settings({ id }: { id: string }) {
  const [settings, setSettings] = useAtom(settingsAtom);
  const windowsDispatch = useSetAtom(windowsListAtom);
  const flags = useFlags();

  const onSave = () => {
    windowsDispatch({ type: "REMOVE", payload: id });
  };

  return (
    <div className={styles.body}>
      <fieldset>
        <legend>Custom API Key</legend>
        <div className={cx("field-row")}>
          <label htmlFor="apiKey" className={styles.label}>
            API Key:
          </label>
          <input
            id="apiKey"
            type="password"
            defaultValue={settings.apiKey || ""}
            onChange={(e) =>
              setSettings({ ...settings, apiKey: e.target.value })
            }
            className={styles.input}
          />
        </div>
        <div className={cx("field-row")}>
          <p className={styles.note}>
            You can use either an{" "}
            <a
              href="https://openrouter.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenRouter
            </a>{" "}
            or{" "}
            <a
              href="https://www.anthropic.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anthropic
            </a>{" "}
            API key. Sonnet 3.5 is the default model.
          </p>
        </div>
      </fieldset>
      {flags.tokens && <ModelSection />}
      <button onClick={onSave} className={styles.submit}>
        Save
      </button>
    </div>
  );
}
