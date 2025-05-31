import { useEffect, useState } from "react";
import { getUserById } from "@/services/userService";

export const useUserInfo = () => {
  const [fullName, setFullName] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (token && userId) {
      getUserById(userId, token).then((data) => {
        if (!data) return; // Token inválido o expirado, no mostramos datos

        const fullName = `${data.firstname} ${data.lastname}`;
        setFullName(fullName);
        setInitials(
          fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        );
      });
    }
  }, []);

  return { fullName, initials };
};
