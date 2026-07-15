const BASE_URL = "https://graph.instagram.com";

export async function getInstagramProfile() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Instagram Access Token not found.");
  }

  const response = await fetch(
    `${BASE_URL}/me?fields=id,username,account_type&access_token=${token}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}