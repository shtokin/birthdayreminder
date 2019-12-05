<?php
namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Birthday extends Eloquent
{
    protected $collection = 'birthdays';
    protected $fillable = ['_id', 'userId', 'birthdays', 'name','date', 'description', 'photo'];
}