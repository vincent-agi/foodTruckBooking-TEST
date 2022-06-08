<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

class BookingOneWeekValidator extends Constraint
{
    public function __construct(string $mode, array $groups = null, mixed $payload = null)
    {
        parent::__construct([], $groups, $payload);

        $this->mode = $mode;
    }

    public function validate($booking, Constraint $constraint)
    {
        if (null === $booking || empty($booking)) {
            return;
        }

        if (!isset($booking) || !is_array($booking) ) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new \UnexpectedValueException('parameter must be array type');
        }
        $firstdayOfWeek = date('l - d/m/Y', strtotime("monday this week"));
        $lastdayOfWeek = date('l - d/m/Y', strtotime("friday this week"));
        foreach($booking as $value) {
            if ($value < $firstdayOfWeek || $value > $lastdayOfWeek) {
                // the argument must be a string or an object implementing __toString()
                $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ date }}', $value)
                    ->addViolation();
            }
        }
    }
}

?>