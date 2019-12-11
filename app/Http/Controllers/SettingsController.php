<?php

namespace App\Http\Controllers;

use App\Settings;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function getSettings(Request $request, $userId)
    {
        $settings = Settings::find($userId);

        return $settings ? $settings : [];
    }

    public function saveLanguage(Request $request, $userId)
    {
        $lang = $request->get('language', 'en');

        $settings = Settings::find($userId);
        if ($settings) {
            $settings->language = $lang;
        } else {
            $doc = [
                '_id' => $userId,
                'language' => $lang
            ];
            $settings = new Settings($doc);
        }
        $settings->save();

        return $lang;
    }

    public function saveTheme(Request $request, $userId)
    {
        $theme = $request->get('theme', 'default');

        $settings = Settings::find($userId);
        if ($settings) {
            $settings->theme = $theme;
        } else {
            $doc = [
                '_id' => $userId,
                'theme' => $theme
            ];
            $settings = new Settings($doc);
        }
        $settings->save();

        return $theme;
    }
}