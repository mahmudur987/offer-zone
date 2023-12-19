import { useEffect, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateCountdown = (targetDate: Date): Countdown => {
  const now = new Date();
  const timeDifference = targetDate.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [countdown, setCountdown] = useState<Countdown>(
    calculateCountdown(targetDate)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-1 justify-between ">
      <div>
        <div className="font-bold">{countdown.days} D</div>
      </div>
      <div>
        <div className="font-bold">{countdown.hours} H</div>
      </div>
      <div>
        <div className="font-bold">{countdown.minutes} M</div>
      </div>
      <div>
        <div className="font-bold bg-red-500 text-white rounded-md p-1">
          {countdown.seconds}s
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
