import { BACKEND_URL } from "./constants";
import {
  BookFormSchema,
  LoginFormSchema,
  ReviewFormSchema,
  SignupFormSchema,
  type BookFormState,
  type FormState,
  type ReviewFormState,
} from "./types";

export const login = async (
  _state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
    };
  }

  const data = {
    username: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    return { success: true, session: result };
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentials!" : response.statusText,
    };
  }
};

export const signup = async (
  _state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = SignupFormSchema.safeParse({
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
    description: formData.get("description"),
    imageUrl: formData.get("image"),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        firstname: fieldErrors.firstname,
        lastname: fieldErrors.lastname,
        email: fieldErrors.email,
        password: fieldErrors.password,
        description: fieldErrors.description,
        image: fieldErrors.imageUrl,
      },
    };
  }

  console.log(validatedFields.data.imageUrl);

  const response = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...validatedFields.data,
      isActive: 1,
      refreshToken: "refreshToken",
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return {
      message:
        response.status === 409
          ? "The user already existed!"
          : response.statusText,
    };
  }
};

export const review = async (
  _state: ReviewFormState,
  formData: FormData,
  accessToken?: string
) => {
  const validatedFields = ReviewFormSchema.safeParse({
    comment: formData.get("comment"),
    numStars: Number(formData.get("numStars")),
    reviewedUserId: Number(formData.get("reviewedUserId")),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        comment: fieldErrors.comment,
        numStars: fieldErrors.numStars,
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      comment: validatedFields.data.comment,
      numStars: validatedFields.data.numStars,
      reviewedUserId: validatedFields.data.reviewedUserId,
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return {
      message: response.statusText,
    };
  }
};

export const book = async (
  _state: BookFormState,
  formData: FormData,
  accessToken?: string
) => {
  const validatedFields = BookFormSchema.safeParse({
    tripId: Number(formData.get("tripId")),
    comment: formData.get("comment"),
    numSeats: Number(formData.get("numSeats")),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        comment: fieldErrors.comment,
        numSeats: fieldErrors.numSeats,
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      tripId: validatedFields.data.tripId,
      comment: validatedFields.data.comment,
      numSeats: validatedFields.data.numSeats,
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return {
      message: response.statusText,
    };
  }
};
