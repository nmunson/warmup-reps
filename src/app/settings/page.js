import { Footer, PageChrome } from "@/components/page-chrome";
import { SettingsForm } from "@/components/settings-form";
import { SettingsIcon } from "@/components/settings-icon";

export default function SettingsPage() {
  return (
    <PageChrome homeHref="/" footer={<Footer />} title="Settings">
      <h2 className="exercise-heading">
        <SettingsIcon className="lift-icon" />
        <span>Settings</span>
      </h2>
      <p>Choose your preferred units, default barbell type, and plate loading preferences.</p>
      <div className="settings-page-content">
        <SettingsForm />
      </div>
    </PageChrome>
  );
}
