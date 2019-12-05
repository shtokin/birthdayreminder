<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Birthday;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class BirthdayController extends Controller
{
    public function create(Request $request)
    {
        $userId = $request->get('userId');
        $name = $request->get('name');
        $date = $request->get('date');
        $description = $request->get('description');

        $photoUrl = '';
        if ($request->hasFile('photo')) {
            $photoUrl = $this->savePhoto($request->file('photo'), $userId);
        }

        $id = md5($name . time());
        $newBirthday = [
            'id' => $id,
            'name' => $name,
            'date' => $date,
            'description' => $description,
            'photo' => $photoUrl
        ];

        $birthday = Birthday::find($userId);
        if (!$birthday) {
            $doc = [
                '_id' => $userId,
                'birthdays' => [ $id => $newBirthday ]
            ];
            $birthday = new Birthday($doc);
        } else {
            $birthday->birthdays = array_merge($birthday->birthdays, [ $id => $newBirthday ]);
        }

        $birthday->save();

        return $newBirthday;
    }

    private function savePhoto(UploadedFile $file, $userId)
    {
        $filename = $file->getFilename();
        $extension = $file->getClientOriginalExtension();
        $fileNameToStore = $filename . '_' . time() . '.' . $extension;
        $path = $file->storeAs('public/' . $userId, $fileNameToStore);

        return Storage::url($path);
    }

    public function list(Request $request, $userId)
    {
        $birthday = Birthday::find($userId);

        return $birthday ? $birthday->birthdays : [];
    }

    public function getBirthday(Request $request, $userId, $birthdayId)
    {
        $result = DB::connection('mongodb')->collection('birthdays')->where(['_id' => $userId])
            ->select(['birthdays.' . $birthdayId ])
            ->first();
        return current($result['birthdays']);
    }

    public function updateBirthday(Request $request, $birthdayId)
    {
        $userId = $request->get('userId');
        $name = $request->get('name');
        $date = $request->get('date');
        $description = $request->get('description');

        $photoUrl = '';
        if ($request->hasFile('photo')) {
            $photoUrl = $this->savePhoto($request->file('photo'), $userId);
            // TODO delete old photo
        }

        $birthdayData = [
            'id' => $birthdayId,
            'name' => $name,
            'date' => $date,
            'description' => $description,
            'photo' => $photoUrl
        ];

        DB::connection('mongodb')->collection('birthdays')
            ->where('_id', $userId)->update(['birthdays.' . $birthdayId => $birthdayData]);

        return $birthdayData;
    }

    public function deleteBirthday(Request $request, $userId, $birthdayId)
    {
        DB::connection('mongodb')->collection('birthdays')
            ->where('_id', $userId)->unset('birthdays.' . $birthdayId);
        return $birthdayId;
    }
}