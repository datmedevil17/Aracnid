import { config } from "@/lib/wagmi";
import { readContract,config,writeContract} from "@wagmi/core";
import {tokenAbi,tokenAddress,platformAbi,platformAddress} from "./contract"

// Token Read Functions
export async function getTokenName() {
  const data = await readContract(config,{
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'name'
  });
  return data;
}

export async function getTokenBalance(address) {
  const data = await readContract(config,{
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'balanceOf',
    args: [address]
  });
  return data;
}

export async function getAllowance(owner, spender) {
  const data = await readContract(config,{
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'allowance',
    args: [owner, spender]
  });
  return data;
}

// Token Write Functions
export async function approveTokens(spender, amount) {
  const result = await writeContract(config,{
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'approve',
    args: [spender, amount]
  });
  return result}

export async function transferTokens(recipient, amount) {
  const result = await writeContract(config,{
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'transfer',
    args: [recipient, amount]
  });
  return result}

// Platform Read Functions
export async function getUserProfile(address) {
  const data = await readContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'getUserProfile',
    args: [address]
  });
  return data;
}

export async function getBountyDetails(bountyId) {
  const data = await readContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'getBounty',
    args: [bountyId]
  });
  return data;
}

export async function getSubmissionDetails(bountyId, submissionIndex) {
  const data = await readContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'getSubmission',
    args: [bountyId, submissionIndex]
  });
  return data;
}

export async function getActiveBountyCount() {
  const data = await readContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'getActiveBountyCount'
  });
  return data;
}

// Platform Write Functions
export async function registerUser() {
  const result = await writeContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'registerUser'
  });
  return result}

export async function createBounty(title, description, requiredStake, durationInDays, value) {
  const result = await writeContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'createBounty',
    args: [title, description, requiredStake, durationInDays],
    value: value
  });
  return result}

export async function submitSolution(bountyId, solutionDetails) {
  const result = await writeContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'submitSolution',
    args: [bountyId, solutionDetails]
  });
  return result}

export async function awardBounty(bountyId, winner) {
  const result = await writeContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'awardBounty',
    args: [bountyId, winner]
  });
  return result}

export async function cancelBounty(bountyId) {
  const result = await writeContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'cancelBounty',
    args: [bountyId]
  });
  return result}

export async function processBountyExpiration(bountyId) {
  const result = await writeContract(config,{
    address: platformAddress,
    abi: platformAbi,
    functionName: 'processBountyExpiration',
    args: [bountyId]
  });
  return result}




