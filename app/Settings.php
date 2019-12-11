<?php


namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Settings extends Eloquent
{
    protected $collection = 'settings';
    protected $fillable = ['_id', 'language', 'theme'];
}