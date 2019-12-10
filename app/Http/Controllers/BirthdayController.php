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
        $description = $request->get('description', '');

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

    /**
     * @param Request $request
     * @param $userId
     * @param $birthdayId
     * @return mixed
     */
    public function getBirthday(Request $request, $userId, $birthdayId)
    {
        return $this->getBirthdayArray($userId, $birthdayId);
    }

    /**
     * Returns array with birthday's data. Like this:
     * [
     *   date => "12/09/2019"
     *   description => "null"
     *   id => "609629b412aaab9a0278e81d41c750da"
     *   name => "Eeee Eeeeee"
     *   photo => "/storage/106462253192543392587/phpBX9YBC_1575896455.jpg"
     * ]
     *
     * @param $userId
     * @param $birthdayId
     * @return array|mixed
     */
    private function getBirthdayArray($userId, $birthdayId)
    {
        $result = DB::connection('mongodb')->collection('birthdays')->where(['_id' => $userId])
            ->select(['birthdays.' . $birthdayId ])
            ->first();
        if (empty($result['birthdays'])) {
            return [];
        }

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
            $this->deleteCurrentPhoto($userId, $birthdayId);
            $photoUrl = $this->savePhoto($request->file('photo'), $userId);
        }

        $prevData = $this->getBirthdayArray($userId, $birthdayId);

        if (empty($prevData)) {
            $birthdayData = [
                'id' => $birthdayId,
                'name' => $name,
                'date' => $date,
                'description' => $description,
                'photo' => $photoUrl
            ];
        } else {
            $birthdayData = [
                'id' => $birthdayId,
                'name' => $name !== $prevData['name'] ? $name : $prevData['name'],
                'date' => $date !== $prevData['date'] ? $date : $prevData['date'],
                'description' => $description !== $prevData['description'] ? $description : $prevData['description'],
                'photo' => $photoUrl ? $photoUrl : $prevData['photo']
            ];
        }

        DB::connection('mongodb')->collection('birthdays')
            ->where('_id', $userId)->update(['birthdays.' . $birthdayId => $birthdayData]);

        return $birthdayData;
    }

    public function deleteBirthday(Request $request, $userId, $birthdayId)
    {
        $this->deleteCurrentPhoto($userId, $birthdayId);

        DB::connection('mongodb')->collection('birthdays')
            ->where('_id', $userId)->unset('birthdays.' . $birthdayId);
        return $birthdayId;
    }

    private function deleteCurrentPhoto($userId, $birthdayId)
    {
        $currentBirthdayData = $this->getBirthdayArray($userId, $birthdayId);

        $url = $currentBirthdayData['photo'];
        $filePath = str_replace('/storage', 'public', $url);
        if ($url && Storage::exists($filePath)) {
            Storage::delete($filePath);
        }
    }
}