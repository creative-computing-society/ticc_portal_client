import { Switch } from "antd";
import { useEffect, useState } from "react";
import { TSiteSettingsKeys, getSettingsLabel } from "./config";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<{
    [key in TSiteSettingsKeys]: boolean;
  }>({
    enableDailyReport: true,
    enableWeeklyReport: true,
    enableMonthlyReport: true,
    enableNonThaparEmails: false,
  });

  const onChange = (property: TSiteSettingsKeys, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [property]: checked }));
  };

  useEffect(() => {
    //fetch settings from backend
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-4xl font-semibold mb-8 ">Settings</h1>
      {Object.keys(settings).map((key) => {
        return (
          <div className="flex flex-row justify-between items-center ml-8 w-1/2 min-w-[400px]">
            <span className="text-lg font-medium">
              {getSettingsLabel(key as TSiteSettingsKeys)}
            </span>
            <Switch
              checked={settings[key as TSiteSettingsKeys]}
              onChange={(checked) =>
                onChange(key as TSiteSettingsKeys, checked)
              }
              className={
                settings[key as TSiteSettingsKeys] ? "" : "bg-gray-400"
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default Settings;
